import {ILinkedList} from './ILinkedList';

export interface ILinkedListNode<T> {
    list: ILinkedList<T>; // Gets the ILinkedList<T> that the ILinkedListNode<T> belongs to.
    next: ILinkedListNode<T>; // Gets the next node in the ILinkedList<T>.
    previous: ILinkedListNode<T>; // Gets the previous node in the ILinkedList<T>.
    value: T; // Gets the value contained in the node.
}
