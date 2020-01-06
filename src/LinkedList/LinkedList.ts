import { ILinkedList } from "./ILinkedList";
import { ILinkedListNode } from "./ILinkedListNode";
import { LinkedListNode } from "./LinkedListNode";
import { IComparer } from "../IComparer";

export class LinkedList<T> implements ILinkedList<T> {
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

    public addAfter(
        linkedListNodeReference: ILinkedListNode<T>,
        linkedListNode: ILinkedListNode<T>
    ): void;
    public addAfter(
        linkedListNodeReference: ILinkedListNode<T>,
        value: T
    ): ILinkedListNode<T>;
    public addAfter(
        linkedListNodeReference: ILinkedListNode<T>,
        linkedListNodeOrValue: ILinkedListNode<T> | T
    ): ILinkedListNode<T> | void {
        const isArgumentLinkedListNode =
            linkedListNodeOrValue instanceof LinkedListNode;

        const node = isArgumentLinkedListNode
            ? (linkedListNodeOrValue as ILinkedListNode<T>)
            : new LinkedListNode<T>(linkedListNodeOrValue as T);

        node.previous = linkedListNodeReference;
        node.next = linkedListNodeReference.next;
        linkedListNodeReference.next = node;

        return isArgumentLinkedListNode ? void 0 : node;
    }

    public addBefore(
        linkedListNodeReference: ILinkedListNode<T>,
        linkedListNode: ILinkedListNode<T>
    ): void;
    public addBefore(
        linkedListNodeReference: ILinkedListNode<T>,
        value: T
    ): ILinkedListNode<T>;
    public addBefore(
        linkedListNodeReference: ILinkedListNode<T>,
        linkedListNodeOrValue: ILinkedListNode<T> | T
    ): ILinkedListNode<T> | void {
        const isArgumentLinkedListNode =
            linkedListNodeOrValue instanceof LinkedListNode;

        const node = isArgumentLinkedListNode
            ? (linkedListNodeOrValue as ILinkedListNode<T>)
            : new LinkedListNode<T>(linkedListNodeOrValue as T);

        node.previous = linkedListNodeReference.previous;
        node.next = linkedListNodeReference;
        linkedListNodeReference.previous = node;

        return isArgumentLinkedListNode ? void 0 : node;
    }

    public addFirst(linkedListNode: ILinkedListNode<T>): void;
    public addFirst(value: T): ILinkedListNode<T>;
    public addFirst(
        linkedListNodeOrValue: ILinkedListNode<T> | T
    ): ILinkedListNode<T> | void {
        const isArgumentLinkedListNode =
            linkedListNodeOrValue instanceof LinkedListNode;

        const node = isArgumentLinkedListNode
            ? (linkedListNodeOrValue as ILinkedListNode<T>)
            : new LinkedListNode<T>(linkedListNodeOrValue as T);

        if (this.first) {
            node.next = this.first;
            node.next.previous = node;
            this.first = node;
        } else {
            this.first = node;
            this.last = node;
        }

        node.list = this;
        this.count += 1;

        return isArgumentLinkedListNode ? void 0 : node;
    }

    public addLast(linkedListNode: ILinkedListNode<T>): void;
    public addLast(value: T): ILinkedListNode<T>;
    public addLast(
        linkedListNodeOrValue: ILinkedListNode<T> | T
    ): ILinkedListNode<T> | void {
        const isArgumentLinkedListNode =
            linkedListNodeOrValue instanceof LinkedListNode;

        const node = isArgumentLinkedListNode
            ? (linkedListNodeOrValue as ILinkedListNode<T>)
            : new LinkedListNode<T>(linkedListNodeOrValue as T);

        if (this.last) {
            node.previous = this.last;
            node.previous.next = node;
            this.last = node;
        } else {
            this.first = node;
            this.last = node;
        }

        node.list = this;
        this.count += 1;

        return isArgumentLinkedListNode ? void 0 : node;
    }

    public clear(): void {
        // Remove self referencing for garbage collector
        while (this.first) {
            const temp = this.first.next;

            this.first.list = null;
            this.first.previous = null;
            this.first.next = null;

            this.first = temp;
        }

        this.first = null;
        this.last = null;
        this.count = 0;
    }

    public contains(value: T): boolean {
        return this.find(value) ? true : false;
    }

    public copyTo(array: T[], index: number = 0): void {
        let node = this.first;

        while (node) {
            array[index] = node.value;
            node = node.next;
            index += 1;
        }
    }

    public find(value: T): ILinkedListNode<T> | null {
        let node = this.first;

        while (node) {
            if (this.__comparer(node.value, value)) {
                return node;
            }

            node = node.next;
        }

        return null;
    }

    public findLast(value: T): ILinkedListNode<T> | null {
        let node = this.last;

        while (node) {
            if (this.__comparer(node.value, value)) {
                return node;
            }

            node = node.previous;
        }

        return null;
    }

    public remove(linkedListNode: ILinkedListNode<T>): void;
    public remove(value: T): boolean;
    public remove(
        linkedListNodeOrValue: ILinkedListNode<T> | T
    ): boolean | void {
        const isArgumentLinkedListNode =
            linkedListNodeOrValue instanceof LinkedListNode;

        if (isArgumentLinkedListNode) {
            const linkedListNode = linkedListNodeOrValue as ILinkedListNode<T>;
            const linkedListNodePrevious = linkedListNode.previous;
            const linkedListNodeNext = linkedListNode.next;

            if (linkedListNodePrevious) {
                linkedListNodePrevious.next = linkedListNodeNext;
            }

            if (linkedListNodeNext) {
                linkedListNodeNext.previous = linkedListNodePrevious;
            }

            linkedListNode.list = null;
            linkedListNode.previous = null;
            linkedListNode.next = null;
            this.count -= 1;

            return void 0;
        }

        let node = this.first;

        while (node) {
            if (this.__comparer(node.value, linkedListNodeOrValue as T)) {
                this.count -= 1;

                return true;
            }

            node = node.next;
        }

        return false;
    }

    public removeFirst(): void {
        if (!this.first) {
            return void 0;
        }

        const temp = this.first;
        this.first = this.first.next;

        temp.list = null;
        temp.previous = null;
        temp.next = null;
        this.count -= 1;
    }

    public removeLast(): void {
        if (!this.last) {
            return void 0;
        }

        const temp = this.last;
        this.last = this.last.previous;

        temp.list = null;
        temp.previous = null;
        temp.next = null;
        this.count -= 1;
    }

    private __defaultComparer(valueA: T, valueB: T): boolean {
        return valueA === valueB;
    }
}
