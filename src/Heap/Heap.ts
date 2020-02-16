import {IHeap} from './IHeap';
import {AbstractArrayStructure} from '../AbstractArrayStructure';

export class Heap<T = never> extends AbstractArrayStructure<T> implements IHeap<T> {
    constructor(size: number = 0) {
        super('Heap', size);
    }

    public getMaxItem(): T | null {
        return this._array[0] || null;
    }

    public insert(value: T): this {
        const array = this._array;
        const compare = this.compare;
        const swap = this.__swap.bind(this);
        const getParentIndex = this.__getParentIndex;
        array.push(value);

        if (this.count === 1) {
            return this;
        }

        let addedElementIndex = array.length - 1;

        // array[addedElementIndex] > array[getParentIndex(addedElementIndex)]
        while (compare(array[addedElementIndex], array[getParentIndex(addedElementIndex)]) === 1) {
            swap(addedElementIndex, getParentIndex(addedElementIndex));
            addedElementIndex = getParentIndex(addedElementIndex);
        }

        return this;
    }

    public remove(value: T): this {
        const array = this._array;
        const compare = this.compare;
        const swap = this.__swap.bind(this);
        const getLeftChildIndex = this.__getLeftChildIndex;
        const getRightChildIndex = this.__getRightChildIndex;
        let itemIndex = this.find(value);
        let continueRearrange = true;

        if (itemIndex < 0) {
            throw this._errorCreator('Value to remove was not found in the tree');
        }

        if (itemIndex === array.length - 1) {
            array.pop();
            return this;
        }

        array[itemIndex] = array.pop() as T;

        while (continueRearrange) {
            // array[itemIndex] > array[getLeftChildIndex(itemIndex)]
            if (compare(array[itemIndex], array[getLeftChildIndex(itemIndex)]) === -1) {
                swap(itemIndex, getLeftChildIndex(itemIndex));
                itemIndex = getLeftChildIndex(itemIndex);
                continue;
            }

            // array[itemIndex] > array[getRightChildIndex(itemIndex)]
            if (compare(array[itemIndex], array[getRightChildIndex(itemIndex)]) === -1) {
                swap(itemIndex, getRightChildIndex(itemIndex));
                itemIndex = getRightChildIndex(itemIndex);
                continue;
            }

            continueRearrange = false;
        }

        return this;
    }

    private __getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    private __getLeftChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 1;
    }

    private __getRightChildIndex(parentIndex: number): number {
        return parentIndex * 2 + 2;
    }

    private __swap(positionA: number, positionB: number): void {
        const tempValue = this._array[positionA];
        this._array[positionA] = this._array[positionB];
        this._array[positionB] = tempValue;
    }
}
