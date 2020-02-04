import {IDictionary} from './IDictionary';
import {IDictionaryEntry} from './IDictionaryEntry';

export class Dictionary<TKey extends {toString(): string;}, TValue> implements IDictionary<TKey, TValue> {
    public count: number;

    private __buckets: number[] | null;
    private __entries: IDictionaryEntry<TKey, TValue>[] | null;
    private __capacity: number;
    private __freeList: number;
    private __freeCount: number;

    constructor(capacity: number = 0) {
        this.__capacity = capacity;
        this.__buckets = null;
        this.__entries = null;
        this.__freeList = -1;
        this.__freeCount = 0;
        this.count = 0;
    }

    public compare(valueA: TKey, valueB: TKey): number {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }

    public add(key: TKey, value: TValue): void {
        if (this.__buckets === null) {
            this.__initialize(this.__capacity);
        }

        const compare = this.compare;
        const buckets = this.__buckets as number[];
        const entries = this.__entries as IDictionaryEntry<TKey, TValue>[];

        // Because we need an index, we want to avoid having negative values,
        // we calculates the logical bitwise AND of the hash and the value 0x7FFFFFFF,
        // thereby eliminating all negative values.
        const hashCode = HashHelper.getHashCode<TKey>(key) & 0x7FFFFFFF;

        // Calculate the remainder of the hashCode divided by the number of buckets.
        // This is the usual way of narrowing the value set of the hash code to the set of possible bucket indices.
        let targetBucket = hashCode % buckets.length;

        // Look at all the entries in the target bucket. The next field of the entry points to the next entry in the chain, in case of collision.
        // If there are no more items in the chain, its value is -1.
        // If we find the key in the dictionary, we update the associated value and return.
        let i: number;
        for (i = buckets[targetBucket]; i >= 0; i = entries[i].next) {
            if (entries[i].hashCode == hashCode && compare(entries[i].key, key)) {
                entries[i].value = value;
                return;
            }
        }

        let index: number;
        if (this.__freeCount > 0) {
            // There is a "hole" in the entries array, because something has been removed.
            // The first empty place is pointed to by freeList, we insert our entry there.
            index = this.__freeList;
            this.__freeList = entries[index].next;
            this.__freeCount--;
        }
        else {
            // There are no "holes" in the entries array.
            if (this.count == entries.length) {
                // The dictionary is full, we need to increase its size by calling Resize.
                // (After Resize, it's guaranteed that there are no holes in the array.)
                this.__resize();
                targetBucket = hashCode % buckets.length;
            }

            // We can simply take the next consecutive place in the entries array.
            index = this.count;
            this.count++;
        }

        // Setting the fields of the entry
        entries[index].hashCode = hashCode;
        entries[index].next = buckets[targetBucket]; // If the bucket already contained an item, it will be the next in the collision resolution chain.
        entries[index].key = key;
        entries[index].value = value;
        buckets[targetBucket] = index; // The bucket will point to this entry from now on.

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
    }

    private __resize(): void {}
}

class HashHelper {
    // Table of prime numbers to use as hash table sizes.
    // A typical resize algorithm would pick the smallest prime number in this array
    // that is larger than twice the previous capacity.
    // Suppose our Hashtable currently has capacity x and enough elements are added
    // such that a resize needs to occur. Resizing first computes 2x then finds the
    // first prime in the table greater than 2x, i.e. if primes are ordered
    // p_1, p_2, ..., p_i, ..., it finds p_n such that p_n-1 < 2x < p_n.
    // Doubling is important for preserving the asymptotic complexity of the
    // hashtable operations such as add.  Having a prime guarantees that double
    // hashing does not lead to infinite loops.  IE, your hash function will be
    // h1(key) + i*h2(key), 0 <= i < size.  h2 and the size must be relatively prime.

    public static readonly primes: number[] = [
        3, 7, 11, 17, 23, 29, 37, 47, 59, 71, 89, 107, 131, 163, 197, 239, 293, 353, 431, 521, 631, 761, 919,
        1103, 1327, 1597, 1931, 2333, 2801, 3371, 4049, 4861, 5839, 7013, 8419, 10103, 12143, 14591,
        17519, 21023, 25229, 30293, 36353, 43627, 52361, 62851, 75431, 90523, 108631, 130363, 156437,
        187751, 225307, 270371, 324449, 389357, 467237, 560689, 672827, 807403, 968897, 1162687, 1395263,
        1674319, 2009191, 2411033, 2893249, 3471899, 4166287, 4999559, 5999471, 7199369
    ];

    public static getPrime(min: number): number {
        if (min < 0) {
            // @TODO Throw exception
        }

        let i: number;
        let len: number;
        const primes = HashHelper.primes;

        for (i = 0, len = primes.length; i < len; i += 1) {
            const prime = primes[i];

            if (prime >= min) {
                return prime;
            }
        }

        return primes[primes.length - 1]; // max size
    }

    /**
     * Calculate a 32 bit FNV-1a hash
     * Found here: https://gist.github.com/vaiorabbit/5657561
     */
    public static getHashCode<TKey extends { toString(): string; }>(key: TKey): number {
        const string = key.toString();

        const FNV1_32A_INIT = 0x811c9dc5;
        let hval = FNV1_32A_INIT;

        let i: number;
        let len: number;
        for (i = 0, len = string.length; i < len; ++i) {
            hval ^= string.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }

        return hval >>> 0;
    }
}
