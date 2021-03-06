import {IComparer} from '../IComparer';

/**
 * https://referencesource.microsoft.com/#mscorlib/system/collections/generic/dictionary.cs
 */
export interface IDictionary<TKey, TValue> extends IComparer<TKey, TKey> {
    count: number; // Gets the number of key/value pairs contained in the IDictionary<TKey,TValue>.
    keys: TKey[]; // Gets a collection containing the keys in the IDictionary<TKey,TValue>.
    values: TValue[]; // Gets a collection containing the values in the Dictionary<TKey,TValue>.

    get(key: TKey): TValue | null;
    add(key: TKey, value: TValue): this;
    clear(): void;

    containsKey(key: TKey): boolean;
    containsValue(value: TValue): boolean;

    remove(key: TKey): boolean;
}
