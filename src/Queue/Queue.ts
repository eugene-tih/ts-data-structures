import {IQueue} from './IQueue';

export class Queue<T> implements IQueue<T> {
    // public count = 0;
    //
    // private readonly __array: T[];
    //
    // public constructor(size: number = 0) {
    //     this.__array = new Array(size);
    // }

    // public compare(valueA: T, valueB: T): number {
    //     return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    // }

    // public clear(): void {
    //     this.count = 0;
    //     this.__array.length = 0;
    // }

    // contains(value: T): boolean {
    //     let i: number;
    //     let len: number;
    //     const array = this.__array;
    //
    //     for (i = 0, len = this.count; i < len; i += 1) {
    //         if (this.compare(array[i], value) === 0) {
    //             return true;
    //         }
    //     }
    //
    //     return false;
    // }
    //
    // copyTo(array: T[], index: number): void {
    //     let i: number;
    //     let len: number;
    //     const originArray = this.__array;
    //
    //     if (index === void 0) {
    //         index = 0;
    //     }
    //
    //     for (i = 0, len = this.count; i < len; i += 1, index += 1) {
    //         array[index] = originArray[i];
    //     }
    // }

    dequeue(): T {
        if (!this.count) {
            throw this.__errorCreator('Queue contains no elements');
        }

        this.count -= 1;
        return this.__array.shift() as T;
    }

    enqueue(value: T): void {
        this.count += 1;
        this.__array.push(value);
    }

    peek(): T {
        if (!this.count) {
            throw this.__errorCreator('Queue contains no elements');
        }

        return this.__array[0];
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

    private __errorCreator(message: string): Error {
        const error = new Error(message);
        error.name = 'TQueue';

        return error;
    }
}
