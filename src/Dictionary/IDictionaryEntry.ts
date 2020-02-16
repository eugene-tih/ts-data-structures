export interface IDictionaryEntry<TKey, TValue> {
    hashCode: number; // Lower 31 bits of hash code, -1 if unused
    next: number; // Index of next entry, -1 if last
    key: TKey | null; // Key of entry
    value: TValue | null; // Value of entry
}
