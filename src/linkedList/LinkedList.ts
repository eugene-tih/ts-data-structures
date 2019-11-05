import {ILinkedList} from './ILinkedList';
import {ILinkedListNode} from './ILinkedListNode';
import {IComparer} from '../IComparer';

class LinkedList<T> implements ILinkedList<T> {
    public count: number;
    public first: ILinkedListNode<T> | null;
    public last: ILinkedListNode<T> | null;

    private __comparer: IComparer<T, T>;

    constructor() {
        this.count = 0;
        this.first = null;
        this.last = null;

        this.__comparer = this.__defaultComparer;
    }

    public setComparer(comparer: IComparer<T, T>): void {
        this.__comparer = comparer;
    }

    private __defaultComparer(valueA: T, valueB: T): boolean {
        return valueA === valueB;
    }

}
