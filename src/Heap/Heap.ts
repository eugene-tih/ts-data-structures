import {IHeap} from './IHeap';
import {AbstractHeap} from '../AbstractHeap';
import {HeapType} from '../HeapType';

export class Heap<T = never> extends AbstractHeap<T> implements IHeap<T> {
    constructor(size: number = 0) {
        super(HeapType.MAX, 'MaxHeap', size);
    }

    protected _comparePosition(valueA: T, valueB: T): number {
        return this.compare(valueA, valueB);
    }

    public getMaxItem(): T | null {
        return this._array[0] || null;
    }

    public insert(value: T): this {
        this._insert(value, this._array);
        return this;
    }

    public remove(value: T): this {
        this._remove(value, this._array);
        return this;
    }
}
