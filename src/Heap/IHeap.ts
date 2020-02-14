import {IComparer} from '../IComparer';

export interface IHeap<T> extends IComparer<T, T> {
    count: number;

    compare(valueA: T, valueB: T): number;
    clear(): void;

    find(value: T): number;
    contains(value: T): boolean;

    copyTo(array: T[], index: number): void;

    getMaxItem(): T | null;
    insert(value: T): this;
    remove(value: T): this;
    toArray(): T[];
}
