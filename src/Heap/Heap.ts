import {IHeap} from './IHeap';
import {AbstractHeap} from '../AbstractHeap';

export class Heap<T = never> extends AbstractHeap<T> implements IHeap<T> {
    constructor(size: number = 0) {
        super('Heap', size);
    }

    public getMaxItem(): T | null {
        return this._array[0] || null;
    }

    public insert(value: T): this {
        return super._insert(value);
    }

    public remove(value: T): this {
        return super._remove(value);
    }
}
