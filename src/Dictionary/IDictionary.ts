export interface IDictionary<TKey, TValue> {
    count: number; // Gets the number of key/value pairs contained in the IDictionary<TKey,TValue>.
    keys: TKey[]; // Gets a collection containing the keys in the IDictionary<TKey,TValue>.
    values: TValue[] // Gets a collection containing the values in the Dictionary<TKey,TValue>.
}
