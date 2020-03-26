import {IPriorityQueue} from './IPriorityQueue';
import {AbstractHeap} from '../AbstractHeap';
import {HeapType} from '../HeapType';

export class PriorityQueue<T = never> extends AbstractHeap<T | number> implements IPriorityQueue<T | number> {
    private __prioritiesArray: number[];

    constructor(size: number = 0) {
        super(HeapType.MIN, 'PriorityQueue', size);
        this.__prioritiesArray = [];
    }

    protected _comparePosition(valueA: number, valueB: number): number {
        // make a minHeap
        return valueA === valueB ? 0 : valueB < valueA ? -1 : 1;
    }

    public dequeue(): T {
        if (!this.count) {
            throw this._errorCreator(`${this._className} contains no elements`);
        }

        // We should always synchronize the array of values with the array of priorities
        const value: T = this._array[0] as T;
        const lastValue: T = this._array.pop() as T;

        if (this.count) {
            this._array[0] = lastValue;
        }

        this._remove(this.__prioritiesArray[0], this.__prioritiesArray);

        return value;
    }

    public enqueue(value: T, priorityIndex: number): void {
        if (priorityIndex < 0) {
            throw this._errorCreator(`Priority index can not be less than 0`);
        }

        // We should always synchronize the array of values with the array of priorities
        this._array.push(value);
        this._insert(priorityIndex, this.__prioritiesArray);
    }

    public peek(): T {
        if (!this.count) {
            throw this._errorCreator(`${this._className} contains no elements`);
        }

        return this._array[0] as T;
    }

    protected _swap(positionA: number, positionB: number, array: (number | T)[]): void {
        // small trick that make swap in both arrays: values and priorities
        super._swap(positionA, positionB, array);
        super._swap(positionA, positionB, this._array);
    }
}
