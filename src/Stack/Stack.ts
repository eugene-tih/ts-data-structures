import {AbstractArrayStructure} from '../AbstractArrayStructure';

export class Stack<T> extends AbstractArrayStructure<T> {
    constructor(size: number = 0) {
        super('Stack', size);
    }

    // Returns the object at the beginning of the Stack<T> without removing it
    peek(): T {
        if (!this.count) {
            throw this._errorCreator('Stack contains no elements');
        }

        return this._array[0];
    }

    // Removes and returns the object at the top of the Stack<T>.
    pop(): T {
        if (!this.count) {
            throw this._errorCreator('Stack contains no elements');
        }

        return this._array.pop() as T;
    }

    // Inserts an object at the top of the Stack<T>.
    push(value: T): void {
        this._array.push(value);
    }
}
