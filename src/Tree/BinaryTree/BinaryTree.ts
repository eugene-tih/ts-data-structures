import {IComparer} from '../../IComparer';
import {IBinaryTreeCommon} from '../IBinaryTreeCommon';
import {BinaryTreeNode} from './BinaryTreeNode';
import {IBinaryTreeNodeCommon} from '../IBinaryTreeNodeCommon';

export class BinaryTree<T> implements IBinaryTreeCommon<T> {
    private __parent: IBinaryTreeNodeCommon<T> | null;
    private __size: number;

    private __comparer: IComparer<T, T>;

    public constructor() {
        this.__parent = null;
        this.__size = 0;

        this.__comparer = this.__defaultComparer;
    }

    public setComparer(comparer: IComparer<T, T>): void {
        this.__comparer = comparer;
    }

    public getSize(): number {
        return this.__size;
    }

    public getHeight(): number {
        let height: number = 0;

        if (!this.__parent) {
            return height;
        }

        let currentNode: IBinaryTreeNodeCommon<T> = this.__parent;
        const queue: IBinaryTreeNodeCommon<T>[] = [currentNode];

        do {
            height += 1;

            let i: number;
            let len: number;
            for (i = 0, len = queue.length; i < len; i += 1) {
                currentNode = queue.pop() as IBinaryTreeNodeCommon<T>;

                if (currentNode.left !== null) {
                    queue.push(currentNode.left);
                }
                if (currentNode.right !== null) {
                    queue.push(currentNode.right);
                }
            }
        } while (queue.length);

        queue.length = 0;
        return height;
    }


    public insert(value: T): this {
        this.__size += 1;

        if (!this.__parent) {
            this.__parent = new BinaryTreeNode(value);

            return this;
        }

        let currentNode: IBinaryTreeNodeCommon<T> = this.__parent;
        const queue: IBinaryTreeNodeCommon<T>[] = [currentNode];

        while (queue.length !== 0) {
            currentNode = queue.pop() as IBinaryTreeNodeCommon<T>;

            if (currentNode.left === null) {
                currentNode = currentNode.left = new BinaryTreeNode(value);
                break;
            }

            if (currentNode.right === null) {
                currentNode = currentNode.right = new BinaryTreeNode(value);
                break;
            }

            queue.push(currentNode.left, currentNode.right);
        }

        queue.length = 0;
        return this;
    }

    public remove(value: T): this {
        let nodeToRemove: IBinaryTreeNodeCommon<T> | null = this.search(value);

        if (nodeToRemove === null) {
            throw this.__errorCreator('Value to remove not found in the tree');
        }

        let parent: IBinaryTreeNodeCommon<T> | null = this.__parent as IBinaryTreeNodeCommon<T>;
        let currentNode: IBinaryTreeNodeCommon<T> | null = this.__parent as IBinaryTreeNodeCommon<T>;

        while (currentNode !== null) {
            if (currentNode.right) {
                parent = currentNode;
                currentNode = currentNode.right;

                continue;
            }

            if (currentNode.left) {
                parent = currentNode;
                currentNode = currentNode.left;
            }

            if (parent === nodeToRemove) {
                this.__parent = null;
                break;
            }

            nodeToRemove.value = currentNode.value;

            if (parent.right === currentNode) {
                parent.right = null;
            }

            if (parent.left === currentNode) {
                parent.left = null;
            }
        }

        parent = currentNode = nodeToRemove = null;
        return this;
    }

    public search(value: T): IBinaryTreeNodeCommon<T> | null {
        let currentNode: IBinaryTreeNodeCommon<T> | null = this.__parent;

        if (!currentNode) {
            return null;
        }

        if (this.__comparer(currentNode.value, value)) {
            return currentNode;
        }

        const queue: IBinaryTreeNodeCommon<T>[] = [currentNode];

        while (queue.length !== 0) {
            currentNode = queue.pop() as IBinaryTreeNodeCommon<T>;

            if (currentNode.left && this.__comparer(currentNode.left.value, value)) {
                return currentNode.left;
            }

            if (currentNode.right && this.__comparer(currentNode.right.value, value)) {
                return currentNode.right;
            }

            if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }

        return null;
    }


    private __defaultComparer(valueA: T, valueB: T): boolean {
        return valueA === valueB;
    }

    private __errorCreator(message: string): Error {
        const error = new Error(message);
        error.name = 'TBinaryTree';

        return error;
    }
}
