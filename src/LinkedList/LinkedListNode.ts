import {ILinkedListNode} from './ILinkedListNode';
import {ILinkedList} from './ILinkedList';

export class LinkedListNode<T> implements ILinkedListNode<T> {
    public list: ILinkedList<T> | null;
    public next: ILinkedListNode<T> | null;
    public previous: ILinkedListNode<T> | null;
    public value: T;

    constructor(value: T) {
        this.list = null;
        this.next = null;
        this.previous = null;
        this.value = value;
    }
}
