import {IPriorityQueue} from './IPriorityQueue';
import {AbstractHeap} from '../AbstractHeap';

export class PriorityQueue<T = never> extends AbstractHeap<T> implements IPriorityQueue<T> {
    constructor(size: number = 0) {
        super('PriorityQueue', size);
    }

    public dequeue(): T {
        if (!this.count) {
            throw this._errorCreator('PriorityQueue contains no elements');
        }

        const currentCompare = this.compare;
        this.compare = this.__priorityCompare;

        const value = this._array[0] as T;
        super._remove(value);

        this.compare = currentCompare;

        return value;
    }

    public enqueue(value: T, priorityIndex: number): void {
        const currentCompare = this.compare;
        this.compare = this.__priorityCompare;

        this._insert(value);

        this.compare = currentCompare;
    }

    public peek(): T {
        if (!this.count) {
            throw this._errorCreator('PriorityQueue contains no elements');
        }

        return this._array[0] as T;
    }

    private __priorityCompare(valueA: T, valueB: T): number {
        return valueA === valueB ? 0 : valueA < valueB ? -1 : 1;
    }
}
