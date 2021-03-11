import {IComparer} from './IComparer';

export interface IArrayStructure<T> extends IComparer<T, T> {
    count: number; // Gets the number of elements contained in the IArrayStructure<T>.

    clear(): void; // Removes all nodes from the IArrayStructure<T>.
    contains(value: T): boolean; // Determines whether a value is in the IArrayStructure<T>.
    copyTo(array: T[], index: number): void; // Copies the entire IArrayStructure<T> to a compatible one-dimensional array, starting at the specified index of the target array.
    toArray(): T[]; // Copies the IArrayStructure<T> elements to a new array.
}
