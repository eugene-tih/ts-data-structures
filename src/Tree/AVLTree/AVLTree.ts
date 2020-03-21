import {AbstractBinaryTree} from '../AbstractBinaryTree';
import {AVLTreeNode} from './AVLTreeNode';

export class AVLTree<T = never> extends AbstractBinaryTree<T> {
    public constructor() {
        super('AVLTree');
    }

    public insert(value: T): this {
        this._size += 1;

        if (!this._root) {
            this._root = new AVLTreeNode(value);

            return this;
        }

        const compare = this.compare;

        const newNode = new AVLTreeNode(value);
        let currentNode: AVLTreeNode<T> | null = this._root as AVLTreeNode<T>;
        let compareResult: number;

        while (currentNode) {
            compareResult = compare(value, currentNode.value);

            if (compareResult === 0) {
                this._size -= 1;
                return this;
            }

            if (compareResult > 0) {
                if (!currentNode.right) {
                    newNode.parent = currentNode;
                    currentNode.right = newNode;

                    break;
                }

                currentNode = currentNode.right;
            } else {
                if (!currentNode.left) {
                    newNode.parent = currentNode;
                    currentNode.left = newNode;

                    break;
                }

                currentNode = currentNode.left;
            }
        }

        // Start walking from added node to the top parent
        currentNode = newNode as AVLTreeNode<T>;

        while (currentNode) {
            this.__balance(currentNode);
            currentNode = currentNode.parent;
        }

        return this;
    }

    public remove(value: T): this {
        const nodeToRemove: AVLTreeNode<T> | null = this.search(value);

        if (!nodeToRemove) {
            throw this._errorCreator(`Value to remove was not found in the ${this._className}`);
        }

        let parentNode = (nodeToRemove.parent || this._root) as AVLTreeNode<T>;

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

            this.__balance(parentNode);
            this._size -= 1;
            return this;
        }

        // Node to remove has only one child
        // Simply replace it with its child
        if (!nodeToRemove.left || !nodeToRemove.right) {
            const childNode = (nodeToRemove.left || nodeToRemove.right) as AVLTreeNode<T>;

            if (parentNode.left === nodeToRemove) {
                parentNode.left = childNode;
                childNode.parent = parentNode;
            } else if (parentNode.right === nodeToRemove) {
                parentNode.right = childNode;
                childNode.parent = parentNode;
            } else {
                // if we remove root node
                this._root = childNode;
                childNode.parent = null;
            }

            this.__balance(childNode);
            this._size -= 1;
            return this;
        }

        // Node to remove has both children
        // There are generally two approaches:
        //     * replacing the data with either the next smallest element in the tree
        //     * (commonly called the predecessor), or replacing it with the next largest
        //     * element in the tree (commonly called the successor). For this
        //     * assignment, use the predecessor.

        // Getting the inOrder successor (min value in the right subtree)
        const tempNode = this._getMinValue(nodeToRemove.right as AVLTreeNode<T>);
        this.remove(tempNode.value); // without this small recursion it's too much code to remove value
        nodeToRemove.value = tempNode.value;

        return this;
    }

    public search(value: T): AVLTreeNode<T> | null {
        if (!this._root) {
            return null;
        }

        const compare = this.compare;
        let currentNode: AVLTreeNode<T> | null = this._root as AVLTreeNode<T>;
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

    private __balance(rootNode: AVLTreeNode<T>): AVLTreeNode<T> {
        this.__fixHeight(rootNode);

        if (this.__getBalanceFactor(rootNode) === 2) {
            // Right-Left Rotation
            if (this.__getBalanceFactor(rootNode.right as AVLTreeNode<T>) < 0) {
                rootNode.right = this.__rotateRight(rootNode.right as AVLTreeNode<T>);
            }

            // Left-Left rotation
            const newRootNode = this.__rotateLeft(rootNode);
            this.__updateParentPointerAfterDoubleRotation(newRootNode, rootNode);

            return newRootNode;
        }

        if (this.__getBalanceFactor(rootNode) === -2) {
            // Left-Right rotation
            if (this.__getBalanceFactor(rootNode.left as AVLTreeNode<T>) > 0) {
                rootNode.left = this.__rotateLeft(rootNode.left as AVLTreeNode<T>);
            }

            // Right-Right rotation
            const newRootNode = this.__rotateRight(rootNode);
            this.__updateParentPointerAfterDoubleRotation(newRootNode, rootNode);

            return newRootNode;
        }

        return rootNode;
    }

    // Rotations
    private __rotateRight(rootNode: AVLTreeNode<T>): AVLTreeNode<T> {
        const tempNode: AVLTreeNode<T> = rootNode.left as AVLTreeNode<T>;
        rootNode.left = tempNode.right;
        tempNode.right = rootNode;

        tempNode.parent = rootNode.parent;
        rootNode.parent = tempNode;

        if (rootNode.left) {
            rootNode.left.parent = rootNode;
        }

        this.__fixHeight(rootNode);
        this.__fixHeight(tempNode);

        return tempNode;
    }

    private __rotateLeft(rootNode: AVLTreeNode<T>): AVLTreeNode<T> {
        const tempNode: AVLTreeNode<T> = rootNode.right as AVLTreeNode<T>;
        rootNode.right = tempNode.left;
        tempNode.left = rootNode;

        tempNode.parent = rootNode.parent;
        rootNode.parent = tempNode;

        if (rootNode.right) {
            rootNode.right.parent = rootNode;
        }

        this.__fixHeight(rootNode);
        this.__fixHeight(tempNode);

        return tempNode;
    }

    // Utils
    private __getNodeHeight(node: AVLTreeNode<T> | null): number {
        return node ? node.height : 0;
    }

    private __getBalanceFactor(node: AVLTreeNode<T>): number {
        return this.__getNodeHeight(node.right) - this.__getNodeHeight(node.left);
    }

    private __fixHeight(node: AVLTreeNode<T>): void {
        const leftHeight: number = this.__getNodeHeight(node.left);
        const rightHeight: number = this.__getNodeHeight(node.right);
        node.height = Math.max(leftHeight, rightHeight) + 1;
    }

    private __updateParentPointerAfterDoubleRotation(newChildNode: AVLTreeNode<T>, oldChildNode: AVLTreeNode<T>): void {
        const parentNode: AVLTreeNode<T> | null = newChildNode.parent;

        if (!parentNode) {
            this._root = newChildNode;
            return;
        }

        if (parentNode.right === oldChildNode) {
            parentNode.right = newChildNode;
        } else {
            parentNode.left = newChildNode;
        }
    }
}
