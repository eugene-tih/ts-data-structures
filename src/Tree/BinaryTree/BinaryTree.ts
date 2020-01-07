import {AbstractBinaryTree} from '../AbstractBinaryTree';
import {BinaryTreeNode} from './BinaryTreeNode';

export class BinaryTree<T> extends AbstractBinaryTree<T> {
    public constructor() {
        super('BinaryTree');
    }

    public insert(value: T): this {
        this._size += 1;

        if (!this._root) {
            this._root = new BinaryTreeNode(value);

            return this;
        }

        let currentNode: BinaryTreeNode<T> = this._root;
        const queue: BinaryTreeNode<T>[] = [currentNode];

        while (queue.length !== 0) {
            currentNode = queue.shift() as BinaryTreeNode<T>;

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
        let nodeToRemove: BinaryTreeNode<T> | null = this.search(value);

        if (nodeToRemove === null) {
            throw this._errorCreator('Value to remove not found in the tree');
        }

        let parentNode: BinaryTreeNode<T> | undefined;
        let currentNode: BinaryTreeNode<T> | null = this._root as BinaryTreeNode<T>;
        const queue: BinaryTreeNode<T>[] = [];

        // Searching for the deepest and rightmost node
        // And link parent of removed node with this child
        while (currentNode !== null) {
            if (currentNode.right) {
                queue.push(currentNode);
                currentNode = currentNode.right;

                continue;
            }

            if (currentNode.left) {
                queue.push(currentNode);
                currentNode = currentNode.left;
                continue;
            }

            parentNode = queue.pop();

            if (!parentNode) {
                this._root = null;
                break;
            }

            nodeToRemove.value = currentNode.value;

            if (parentNode.left === currentNode) {
                parentNode.left = null;
            }

            if (parentNode.right === currentNode) {
                parentNode.right = null;
            }

            currentNode = null;
        }

        queue.length = 0;
        this._size -= 1;
        return this;
    }

    public search(value: T): BinaryTreeNode<T> | null {
        if (!this._root) {
            return null;
        }

        const compare = this.compare;
        let currentNode: BinaryTreeNode<T> | null = this._root;

        if (compare(currentNode.value, value) === 0) {
            return currentNode;
        }

        const stack: BinaryTreeNode<T>[] = [currentNode];

        while (stack.length !== 0) {
            currentNode = stack.pop() as BinaryTreeNode<T>;

            if (currentNode.left && compare(currentNode.left.value, value) === 0) {
                return currentNode.left;
            }

            if (currentNode.right && compare(currentNode.right.value, value) === 0) {
                return currentNode.right;
            }

            if (currentNode.left) {
                stack.push(currentNode.left);
            }

            if (currentNode.right) {
                stack.push(currentNode.right);
            }
        }

        return null;
    }
}
