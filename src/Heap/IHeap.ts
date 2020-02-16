import {IArrayStructure} from '../IArrayStructure';

export interface IHeap<T> extends IArrayStructure<T> {
    getMaxItem(): T | null;
    insert(value: T): this;
    remove(value: T): this;
}
