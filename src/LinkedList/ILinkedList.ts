import {ILinkedListNode} from './ILinkedListNode';
import {IComparer} from '../IComparer';

export interface ILinkedList<T> extends IComparer<T, T> {
    count: number; // Gets the number of nodes actually contained in the ILinkedList<T>.
    first: ILinkedListNode<T> | null; // Gets the first node of the ILinkedList<T>
    last: ILinkedListNode<T> | null; // Gets the last node of the ILinkedList<T>.

    addAfter(linkedListNodeReference: ILinkedListNode<T>, linkedListNode: ILinkedListNode<T>): void; // Adds the specified new node after the specified existing node in the ILinkedList<T>.
    addAfter(linkedListNodeReference: ILinkedListNode<T>, value: T): ILinkedListNode<T>; // Adds a new node containing the specified value after the specified existing node in the ILinkedList<T>.

    addBefore(linkedListNodeReference: ILinkedListNode<T>, linkedListNode: ILinkedListNode<T>): void; // Adds the specified new node before the specified existing node in the ILinkedList<T>.
    addBefore(linkedListNodeReference: ILinkedListNode<T>, value: T): ILinkedListNode<T>; // Adds a new node containing the specified value before the specified existing node in the ILinkedList<T>.

    addFirst(linkedListNode: ILinkedListNode<T>): void; // Adds the specified new node at the start of the ILinkedList<T>.
    addFirst(value: T): ILinkedListNode<T>; // Adds a new node containing the specified value at the start of the ILinkedList<T>.

    addLast(linkedListNode: ILinkedListNode<T>): void; // Adds the specified new node at the end of the ILinkedList<T>.
    addLast(value: T): ILinkedListNode<T>; // Adds a new node containing the specified value at the end of the ILinkedList<T>.

    clear(): void; // Removes all nodes from the ILinkedList<T>.

    contains(value: T): boolean; // Determines whether a value is in the ILinkedList<T>.

    copyTo(array: T[], index: number): void; // Copies the entire ILinkedList<T> to a compatible one-dimensional array, starting at the specified index of the target array.

    find(value: T): ILinkedListNode<T> | null; // Finds the first node that contains the specified value.
    findLast(value: T): ILinkedListNode<T> | null; // Finds the last node that contains the specified value.

    remove(linkedListNode: ILinkedListNode<T>): void; // Removes the specified node from the ILinkedList<T>.
    remove(value: T): boolean; // Removes the first occurrence of the specified value from the LinkedList<T>.

    removeFirst(): void; // Removes the node at the start of the ILinkedList<T>.
    removeLast(): void; // Removes the node at the end of the ILinkedList<T>.
}
