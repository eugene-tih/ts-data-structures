import {IArrayStructure} from '../IArrayStructure';

export interface IPriorityQueue<T> extends IArrayStructure<T> {
    dequeue(): T; // Removes and returns the object at the beginning of the IPriorityQueue<T>
    enqueue(value: T, priorityIndex: number): void; // Adds an object to the specific place of the IPriorityQueue<T>
    peek(): T; // Returns the object at the beginning of the IPriorityQueue<T> without removing it
}
