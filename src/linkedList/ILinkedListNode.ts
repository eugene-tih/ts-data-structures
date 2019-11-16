import {ILinkedList} from './ILinkedList';

export interface ILinkedListNode<T> {
    list: ILinkedList<T> | null; // Gets the ILinkedList<T> that the ILinkedListNode<T> belongs to.
    next: ILinkedListNode<T> | null; // Gets the next node in the ILinkedList<T>.
    previous: ILinkedListNode<T> | null; // Gets the previous node in the ILinkedList<T>.
    value: T; // Gets the value contained in the node.
}
