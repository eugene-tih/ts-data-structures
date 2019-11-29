import {IStack} from './IStack';
import {IComparer} from '../IComparer';

export class Stack<T> implements IStack<T> {
    public count = 0;

    private readonly __array: T[];
    private __comparer: IComparer<T, T>;

    public constructor(size: number = 0) {
        this.__comparer = this.__defaultComparer;
        this.__array = new Array(size);
    }

    public setComparer(comparer: IComparer<T, T>): void {
        this.__comparer = comparer;
    }

    public clear(): void {
        this.count = 0;
        this.__array.length = 0;
    }

    contains(value: T): boolean {
        let i: number;
        let len: number;
        const array = this.__array;

        for (i = 0, len = this.count; i < len; i += 1) {
            if (this.__comparer(array[i], value)) {
                return true;
            }
        }

        return false;
    }

    copyTo(array: T[], index: number): void {
        let i: number;
        let len: number;
        const originArray = this.__array;

        if (index === void 0) {
            index = 0;
        }

        for (i = 0, len = this.count; i < len; i += 1, index += 1) {
            array[index] = originArray[i];
        }
    }

    peek(): T {
        if (!this.count) {
            throw this.__errorCreator('Stack contains no elements');
        }

        return this.__array[0];
    }

    pop(): T {
        if (!this.count) {
            throw this.__errorCreator('Stack contains no elements');
        }

        this.count -= 1;
        return this.__array.pop() as T;
    }

    push(value: T): void {
        this.count += 1;
        this.__array.push(value);
    }

    toArray(): T[] {
        const newArray = [];
        const originArray = this.__array;

        let i: number;
        let len: number;
        for (i = 0, len = this.count; i < len; i += 1) {
            newArray[i] = originArray[i];
        }

        return newArray;
    }

    private __defaultComparer(valueA: T, valueB: T): boolean {
        return valueA === valueB;
    }

    private __errorCreator(message: string): Error {
        const error = new Error(message);
        error.name = 'TStack';

        return error;
    }
}
