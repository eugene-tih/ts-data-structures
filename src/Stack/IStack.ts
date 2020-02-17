import {IArrayStructure} from '../IArrayStructure';

export interface IStack<T> extends IArrayStructure<T> {
    peek(): T; // Returns the object at the top of the IStack<T> without removing it.
    pop(): T; // Removes and returns the object at the top of the IStack<T>.
    push(value: T): void; // Inserts an object at the top of the IStack<T>.
}
