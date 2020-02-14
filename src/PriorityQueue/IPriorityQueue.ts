import {IComparer} from '../IComparer';

export interface IPriorityQueue<T> extends IComparer<T, T> {
    count: number;

    compare(valueA: T, valueB: T): number;
    clear(): void;

    contains(value: T): boolean;

    copyTo(array: T[], index: number): void;

    dequeue(): T; // Removes and returns the object at the beginning of the IPriorityQueue<T>
    enqueue(value: T): void; // Adds an object to the end of the IPriorityQueue<T>
    peek(): T; // Returns the object at the beginning of the IPriorityQueue<T> without removing it
    toArray(): T[];
}
