import {IDictionary} from './IDictionary';
import {IDictionaryEntry} from './IDictionaryEntry';
import {DictionaryEntry} from './DictionaryEntry';
import {HashHelper} from './HashHelper';

export class Dictionary<TKey extends {toString(): string} = never, TValue = never> implements IDictionary<TKey, TValue> {
    private __count: number;
    private __buckets: number[] | null;
    private __entries: IDictionaryEntry<TKey, TValue>[] | null;
    private __freeList: number;
    private __freeCount: number;

    private readonly __capacity: number;
    private readonly __errorName: string;

    constructor(capacity: number = 0) {
        this.__capacity = capacity;
        this.__buckets = null;
        this.__entries = null;
        this.__freeList = -1;
        this.__freeCount = 0;
        this.__count = 0;

        this.__errorName = 'TDictionary';
    }

    get count(): number {
        return this.__count - this.__freeCount;
    }

    get keys(): TKey[] {
        const newArray: TKey[] = [];
        const entries = this.__entries as IDictionaryEntry<TKey, TValue>[];
        let i: number;

        if (!this.__count) {
            return newArray;
        }

        for (i = 0; i < this.__count; i++) {
            if (entries[i].hashCode >= 0) {
                newArray[i] = entries[i].key as TKey;
            }
        }

        return newArray;
    }

    get values(): TValue[] {
        const newArray: TValue[] = [];
        const entries = this.__entries as IDictionaryEntry<TKey, TValue>[];
        let i: number;

        if (!this.__count) {
            return newArray;
        }

        for (i = 0; i < this.__count; i++) {
            if (entries[i].hashCode >= 0) {
                newArray[i] = entries[i].value as TValue;
            }
        }

        return newArray;
    }

    public compare(valueA: TKey | TValue, valueB: TKey | TValue): number {
        return valueA === valueB ? 0 : valueA < valueB ? -1 : 1;
    }

    public get(key: TKey): TValue | null {
        const compare = this.compare;
        const buckets = this.__buckets as number[];
        const entries = this.__entries as IDictionaryEntry<TKey, TValue>[];

        if (buckets !== null) {
            const hashCode = HashHelper.getHashCode<TKey>(key) & 0x7fffffff;

            let i: number;
            for (i = buckets[hashCode % buckets.length]; i >= 0; i = entries[i].next) {
                if (entries[i].hashCode == hashCode && compare(entries[i].key as TKey, key) === 0) {
                    return entries[i].value;
                }
            }
        }

        return null;
    }

    public add(key: TKey, value: TValue): this {
        if (key === null || key === undefined) {
            throw this._errorCreator(`Key value could not be 'null' or 'undefined'`);
        }

        if (this.__buckets === null) {
            this.__initialize(this.__capacity);
        }

        const compare = this.compare;
        let buckets = this.__buckets as number[];
        let entries = this.__entries as IDictionaryEntry<TKey, TValue>[];

        // Because we need an index, we want to avoid having negative values,
        // we calculates the logical bitwise AND of the hash and the value 0x7FFFFFFF,
        // thereby eliminating all negative values.
        const hashCode = HashHelper.getHashCode<TKey>(key) & 0x7fffffff;

        // Calculate the remainder of the hashCode divided by the number of buckets.
        // This is the usual way of narrowing the value set of the hash code to the set of possible bucket indices.
        let targetBucket = hashCode % buckets.length;

        // Look at all the entries in the target bucket. The next field of the entry points to the next entry in the chain, in case of collision.
        // If there are no more items in the chain, its value is -1.
        // If we find the key in the dictionary, we update the associated value and return.
        let i: number;
        for (i = buckets[targetBucket]; i >= 0; i = entries[i].next) {
            if (entries[i].hashCode == hashCode && compare(entries[i].key as TKey, key) === 0) {
                entries[i].value = value;
                return this;
            }
        }

        let index: number;
        if (this.__freeCount > 0) {
            // There is a "hole" in the entries array, because something has been removed.
            // The first empty place is pointed to by freeList, we insert our entry there.
            index = this.__freeList;
            this.__freeList = entries[index].next;
            this.__freeCount--;
        } else {
            // There are no "holes" in the entries array.
            if (this.count === entries.length) {
                // The dictionary is full, we need to increase its size by calling Resize.
                // (After Resize, it's guaranteed that there are no holes in the array.)
                this.__resize(HashHelper.getPrime(this.count));

                buckets = this.__buckets as number[];
                entries = this.__entries as IDictionaryEntry<TKey, TValue>[];
                targetBucket = hashCode % buckets.length;
            }

            // We can simply take the next consecutive place in the entries array.
            index = this.count;
            this.__count++;
        }

        const entry = new DictionaryEntry<TKey, TValue>();
        entries[index] = entry;

        // Setting the fields of the entry
        entries[index].hashCode = hashCode;
        entries[index].next = buckets[targetBucket]; // If the bucket already contained an item, it will be the next in the collision resolution chain.
        entries[index].key = key;
        entries[index].value = value;
        buckets[targetBucket] = index; // The bucket will point to this entry from now on.

        return this;
    }

    public clear(): void {
        if (this.count > 0) {
            let i: number;
            let len: number;
            for (i = 0, len = (this.__buckets as number[]).length; i < len; i += 1) {
                (this.__buckets as number[])[i] = -1;
            }

            (this.__entries as IDictionaryEntry<TKey, TValue>[]).length = 0;
            this.__freeList = -1;
            this.__freeCount = 0;
            this.__count = 0;
        }
    }

    public containsKey(key: TKey): boolean {
        const result = this.get(key);

        return result !== null;
    }

    public containsValue(value: TValue): boolean {
        const compare = this.compare;
        const entries = this.__entries as IDictionaryEntry<TKey, TValue>[];

        let i: number;
        for (i = 0; i < this.__count; i++) {
            if (entries[i].hashCode >= 0 && compare(entries[i].value as TValue, value) === 0) {
                return true;
            }
        }

        return false;
    }

    public remove(key: TKey): boolean {
        if (key === null || key === undefined) {
            throw this._errorCreator(`Key value could not be 'null' or 'undefined'`);
        }

        const compare = this.compare;
        const buckets = this.__buckets as number[];
        const entries = this.__entries as IDictionaryEntry<TKey, TValue>[];

        if (buckets !== null) {
            const hashCode = HashHelper.getHashCode<TKey>(key) & 0x7fffffff;
            const targetBucket = hashCode % buckets.length;

            let last = -1;
            let i: number;
            for (i = buckets[targetBucket]; i >= 0; last = i, i = entries[i].next) {
                if (entries[i].hashCode === hashCode && compare(entries[i].key as TKey, key) === 0) {
                    if (last < 0) {
                        buckets[targetBucket] = entries[i].next;
                    } else {
                        entries[last].next = entries[i].next;
                    }

                    entries[i].hashCode = -1;
                    entries[i].next = this.__freeList;
                    entries[i].key = null;
                    entries[i].value = null;
                    this.__freeList = i;
                    this.__freeCount++;

                    return true;
                }
            }
        }

        return false;
    }

    private __initialize(capacity: number): void {
        const size = HashHelper.getPrime(capacity);
        this.__buckets = new Array(size);
        this.__entries = new Array(size);

        let i: number;
        let len: number;
        for (i = 0, len = this.__buckets.length; i < len; i++) {
            this.__buckets[i] = -1;
        }

        this.__freeList = -1;
    }

    private __resize(newSize: number): void {
        const newBuckets = new Array(newSize);
        const newEntries = new Array(newSize);

        let i: number;
        for (i = 0; i < newBuckets.length; i += 1) {
            newBuckets[i] = -1;
        }

        let len: number;
        for (i = 0, len = (this.__entries as IDictionaryEntry<TKey, TValue>[]).length; i < len; i += 1) {
            newEntries[i] = (this.__entries as IDictionaryEntry<TKey, TValue>[])[i];
        }

        for (i = 0; i < this.count; i += 1) {
            if (newEntries[i].hashCode >= 0) {
                let bucket = newEntries[i].hashCode % newSize;
                newEntries[i].next = newBuckets[bucket];
                newBuckets[bucket] = i;
            }
        }

        this.__buckets = newBuckets;
        this.__entries = newEntries;
    }

    protected _errorCreator(message: string): Error {
        const error = new Error(message);
        error.name = this.__errorName;
        return error;
    }
}
