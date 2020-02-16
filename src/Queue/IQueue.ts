import {IArrayStructure} from '../IArrayStructure';

export interface IQueue<T> extends IArrayStructure<T> {
    dequeue(): T; // Removes and returns the object at the beginning of the IQueue<T>
    enqueue(value: T): void; // Adds an object to the end of the IQueue<T>
    peek(): T; // Returns the object at the beginning of the IQueue<T> without removing it
}
