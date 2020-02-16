import {AbstractBinaryTree} from '../AbstractBinaryTree';
import {BinarySearchTreeNode} from './BinarySearchTreeNode';

export class BinarySearchTree<T = never> extends AbstractBinaryTree<T> {
    public constructor() {
        super('BinarySearchTree');
    }

    public insert(value: T): this {
        this._size += 1;

        if (!this._root) {
            this._root = new BinarySearchTreeNode(value);

            return this;
        }

        const compare = this.compare;
        let currentNode: BinarySearchTreeNode<T> = this._root;
        let compareResult: number;

        while (currentNode) {
            compareResult = compare(value, currentNode.value);

            if (compareResult === 0) {
                this._size -= 1;
                break;
            }

            if (compareResult > 0) {
                if (!currentNode.right) {
                    currentNode.right = new BinarySearchTreeNode(value);
                    break;
                }

                currentNode = currentNode.right;
            } else {
                if (!currentNode.left) {
                    currentNode.left = new BinarySearchTreeNode(value);
                    break;
                }

                currentNode = currentNode.left;
            }
        }

        return this;
    }

    public remove(value: T): this {
        if (!this._root) {
            throw this._errorCreator('Value to remove was not found in the tree');
        }

        const compare = this.compare;
        let parentNode: BinarySearchTreeNode<T> = this._root;
        let nodeToRemove: BinarySearchTreeNode<T> = this._root;
        let compareResult: number;

        while (nodeToRemove) {
            compareResult = compare(value, nodeToRemove.value);

            // [First part START]
            // We are looking for node to remove. If we do not find it then we will throw an error
            if (compareResult > 0) {
                if (!nodeToRemove.right) {
                    throw this._errorCreator('Value to remove was not found in the tree');
                }

                parentNode = nodeToRemove;
                nodeToRemove = nodeToRemove.right;
                continue;
            }

            if (compareResult < 0) {
                if (!nodeToRemove.left) {
                    throw this._errorCreator('Value to remove was not found in the tree');
                }

                parentNode = nodeToRemove;
                nodeToRemove = nodeToRemove.left;
                continue;
            }
            // [First part END]

            // [Second part START]
            this._size -= 1;
            // Node to remove has not any children
            // Simply remove it from the tree
            if (!nodeToRemove.left && !nodeToRemove.right) {
                if (parentNode.left === nodeToRemove) {
                    parentNode.left = null;
                } else if (parentNode.right === nodeToRemove) {
                    parentNode.right = null;
                } else {
                    this._root = null;
                }

                break;
            }

            // Node to remove has only one child
            // Simply replace it with its child
            if (!nodeToRemove.left || !nodeToRemove.right) {
                let tempNode: BinarySearchTreeNode<T>;

                if (nodeToRemove.left) {
                    tempNode = nodeToRemove.left as BinarySearchTreeNode<T>;
                } else {
                    tempNode = nodeToRemove.right as BinarySearchTreeNode<T>;
                }

                if (parentNode.left === nodeToRemove) {
                    parentNode.left = tempNode;
                } else if (parentNode.right === nodeToRemove) {
                    parentNode.right = tempNode;
                } else {
                    // if we remove root node
                    this._root = tempNode;
                }

                break;
            }

            // Node to remove has both children
            // There are generally two approaches:
            //     * replacing the data with either the next smallest element in the tree
            //     * (commonly called the predecessor), or replacing it with the next largest
            //     * element in the tree (commonly called the successor). For this
            //     * assignment, use the predecessor.

            // Getting the inOrder successor (min value in the right subtree)
            let tempNode: BinarySearchTreeNode<T> = this._getMinValue(nodeToRemove.right);
            this.remove(tempNode.value); // without this small recursion it's too much code to remove value
            nodeToRemove.value = tempNode.value;

            break;
            // [Second part END]
        }

        return this;
    }

    public search(value: T): BinarySearchTreeNode<T> | null {
        if (!this._root) {
            return null;
        }

        const compare = this.compare;
        let currentNode: BinarySearchTreeNode<T> | null = this._root;
        let compareResult: number;

        while (currentNode) {
            compareResult = compare(value, currentNode.value);

            if (compareResult === 0) {
                return currentNode;
            }

            if (compareResult > 0) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }

        return null;
    }
}
