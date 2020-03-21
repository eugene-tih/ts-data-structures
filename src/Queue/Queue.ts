import {AbstractArrayStructure} from '../AbstractArrayStructure';

export class Queue<T = never> extends AbstractArrayStructure<T> {
    constructor(size: number = 0) {
        super('Queue', size);
    }

    // Removes and returns the object at the beginning of the Queue<T>
    dequeue(): T {
        if (!this.count) {
            throw this._errorCreator(`${this._className} contains no elements`);
        }

        return this._array.shift() as T;
    }

    // Adds an object to the end of the Queue<T>
    enqueue(value: T): void {
        this._array.push(value);
    }

    // Returns the object at the beginning of the Queue<T> without removing it
    peek(): T {
        if (!this.count) {
            throw this._errorCreator(`${this._className} contains no elements`);
        }

        return this._array[0];
    }
}
