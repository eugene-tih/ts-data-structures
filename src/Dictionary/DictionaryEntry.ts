import {IDictionaryEntry} from './IDictionaryEntry';

export class DictionaryEntry<TKey, TValue> implements IDictionaryEntry<TKey, TValue> {
    public hashCode: number;
    public next: number;
    public key: TKey | null; // Key of entry
    public value: TValue | null; // Value of entry

    constructor() {
        this.hashCode = -1;
        this.next = -1;
        this.key = null;
        this.value = null;
    }
}
