import { AbstractBinaryTree } from "../AbstractBinaryTree";
import { BinarySearchTreeNode } from "./BinarySearchTreeNode";

export class BinarySearchTree<T> extends AbstractBinaryTree<T> {
    public constructor() {
        super("BinarySearchTree");
    }

    public insert(value: T): this {
        this._size += 1;

        if (!this._parent) {
            this._parent = new BinarySearchTreeNode(value);

            return this;
        }

        const compare = this.compare;
        let currentNode: BinarySearchTreeNode<T> = this._parent;
        let compareResult: number;

        while (currentNode) {
            compareResult = compare(value, currentNode.value);

            if (compareResult === 0) {
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
        if (!this._parent) {
            throw this._errorCreator("Value to remove not found in the tree");
        }

        const compare = this.compare;
        let previousNode: BinarySearchTreeNode<T> = this._parent;
        let nodeToRemove: BinarySearchTreeNode<T> = this._parent;
        let compareResult: number;

        while (nodeToRemove) {
            compareResult = compare(value, nodeToRemove.value);

            // [First part START]
            // We are looking for node to remove. If we do not find it then we will throw an error
            if (compareResult > 0) {
                if (!nodeToRemove.right) {
                    throw this._errorCreator(
                        "Value to remove not found in the tree"
                    );
                }

                previousNode = nodeToRemove;
                nodeToRemove = nodeToRemove.right;
                continue;
            }

            if (compareResult < 0) {
                if (!nodeToRemove.left) {
                    throw this._errorCreator(
                        "Value to remove not found in the tree"
                    );
                }

                previousNode = nodeToRemove;
                nodeToRemove = nodeToRemove.left;
                continue;
            }
            // [First part END]

            // [Second part START]
            // Node to remove has not any children
            // Simply remove from the tree
            if (!nodeToRemove.left && !nodeToRemove.right) {
                if (previousNode.left === nodeToRemove) {
                    previousNode.left = null;
                } else {
                    previousNode.right = null;
                }

                break;
            }

            // Node to remove has only one child
            // Link parent of removed node with this child
            if (!nodeToRemove.left || !nodeToRemove.right) {
                let tempNode: BinarySearchTreeNode<T>;

                if (nodeToRemove.left) {
                    tempNode = nodeToRemove.left as BinarySearchTreeNode<T>;
                } else {
                    tempNode = nodeToRemove.right as BinarySearchTreeNode<T>;
                }

                if (previousNode.right === nodeToRemove) {
                    previousNode.right = tempNode;
                } else {
                    previousNode.left = tempNode;
                }
            }

            // Node to remove has both children
            // Getting the inOrder successor (min value in the right subtree)
            let tempNode = nodeToRemove.right as BinarySearchTreeNode<T>;

            while (tempNode.left) {
                tempNode = tempNode.left;
            }

            tempNode.value = nodeToRemove.value;

            if (previousNode.left === nodeToRemove) {
                previousNode.left = tempNode;
            } else {
                previousNode.right = tempNode;
            }

            if (!tempNode.right) {
                tempNode.right = nodeToRemove.right;
            }

            if (!tempNode.left) {
                tempNode.left = nodeToRemove.left;
            }
            // [Second part END]
        }

        return this;
    }

    public search(value: T): BinarySearchTreeNode<T> | null {
        if (!this._parent) {
            return null;
        }

        const compare = this.compare;
        let currentNode: BinarySearchTreeNode<T> | null = this._parent;
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
