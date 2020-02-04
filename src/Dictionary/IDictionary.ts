import {IComparer} from '../IComparer';

export interface IDictionary<TKey extends Object, TValue> extends IComparer<TKey, TKey> {
    count: number; // Gets the number of key/value pairs contained in the IDictionary<TKey,TValue>.
    keys: TKey[]; // Gets a collection containing the keys in the IDictionary<TKey,TValue>.
    values: TValue[] // Gets a collection containing the values in the Dictionary<TKey,TValue>.

    compare(valueA: TKey, valueB: TKey): number;

    add(key: TKey, value: TValue): void;
    clear(): void;

    containsKey(key: TKey): boolean;
    containsValue(value: TValue): boolean;

    remove(key: TKey): boolean;
}
