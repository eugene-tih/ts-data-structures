import {AbstractArrayStructure} from './AbstractArrayStructure';
import {HeapType} from './HeapType';

export abstract class AbstractHeap<T> extends AbstractArrayStructure<T> {
    private __heapType: HeapType;

    protected constructor(heapType: HeapType, className: string, size: number = 0) {
        super(className, size);
        this.__heapType = heapType;
    }

    public compare(valueA: T, valueB: T): number {
        return valueA === valueB ? 0 : valueA < valueB ? -1 : 1;
    }

    protected abstract _comparePosition(valueA: T, valueB: T): number;

    protected _insert(value: T, array: T[]): number {
        const swap = this._swap.bind(this);
        const comparePosition = this._comparePosition.bind(this);
        const getParentIndex = this.__getParentIndex;
        array.push(value);

        if (this.count === 1) {
            return 0;
        }

        let addedElementIndex = array.length - 1;

        // array[addedElementIndex] > array[getParentIndex(addedElementIndex)]
        while (
            comparePosition(array[addedElementIndex], array[getParentIndex(addedElementIndex)]) === 1 &&
            getParentIndex(addedElementIndex) > -1
        ) {
            swap(addedElementIndex, getParentIndex(addedElementIndex), array);
            addedElementIndex = getParentIndex(addedElementIndex);
        }

        return addedElementIndex;
    }

    protected _remove(value: T, array: T[]): number {
        const swap = this._swap.bind(this);
        const comparePosition = this._comparePosition.bind(this);
        const getLeftChildIndex = this.__getLeftChildIndex;
        const getRightChildIndex = this.__getRightChildIndex;
        let itemIndex = this.__find(value, array);

        if (itemIndex < 0) {
            throw this._errorCreator(`Value to remove was not found in the ${this._className}`);
        }

        if (itemIndex === array.length - 1) {
            array.pop();
            return itemIndex;
        }

        array[itemIndex] = array.pop() as T;

        // While current itemIndex smaller than any child (for MAX heap)
        while (
            comparePosition(array[itemIndex], array[getLeftChildIndex(itemIndex)]) === -1 ||
            comparePosition(array[itemIndex], array[getRightChildIndex(itemIndex)]) === -1
        ) {
            // For different types of heap should be different compare
            const isCompareResultPositive =
                this.__heapType === HeapType.MAX
                    ? array[getLeftChildIndex(itemIndex)] > array[getRightChildIndex(itemIndex)]
                    : array[getLeftChildIndex(itemIndex)] < array[getRightChildIndex(itemIndex)];

            if (isCompareResultPositive) {
                // array[itemIndex] > array[getLeftChildIndex(itemIndex)] (for MAX heap)
                swap(itemIndex, getLeftChildIndex(itemIndex), array);
                itemIndex = getLeftChildIndex(itemIndex);
            } else {
                // array[itemIndex] > array[getRightChildIndex(itemIndex)] (for MAX heap)
                swap(itemIndex, getRightChildIndex(itemIndex), array);
                itemIndex = getRightChildIndex(itemIndex);
            }
        }

        return itemIndex;
    }

    protected _swap(positionA: number, positionB: number, array: T[]): void {
        const tempValue = array[positionA];
        array[positionA] = array[positionB];
        array[positionB] = tempValue;
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

    private __find(value: T, array: T[]): number {
        const compare = this._comparePosition.bind(this);

        let i: number;
        let len: number;

        for (i = 0, len = array.length; i < len; i += 1) {
            if (compare(array[i], value) === 0) {
                return i;
            }
        }

        return -1;
    }
}
