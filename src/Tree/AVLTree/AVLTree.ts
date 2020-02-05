import {AbstractBinaryTree} from '../AbstractBinaryTree';
import {AVLTreeNode} from './AVLTreeNode';

export class AVLTree<T> extends AbstractBinaryTree<T> {
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

        while (currentNode && currentNode.parent) {
            this.__balance(currentNode.parent);
            currentNode = currentNode.parent;
        }

        return this;
    }

    public remove(value: T): this {
        console.log(value);
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
            return this.__rotateLeft(rootNode);
        }

        if (this.__getBalanceFactor(rootNode) === -2) {
            // Left-Right rotation
            if (this.__getBalanceFactor(rootNode.left as AVLTreeNode<T>) > 0) {
                rootNode.left = this.__rotateLeft(rootNode.left as AVLTreeNode<T>);
            }

            // Right-Right rotation
            return this.__rotateRight(rootNode);
        }

        return rootNode;
    }

    // Rotations
    // Left-Left Heavy (LL)
    private __rotateRight(rootNode: AVLTreeNode<T>): AVLTreeNode<T> {
        const tempNode: AVLTreeNode<T> = rootNode.left as AVLTreeNode<T>;
        rootNode.left = tempNode.right;
        tempNode.right = rootNode;

        tempNode.parent = rootNode.parent;
        rootNode.parent = tempNode;

        if (tempNode.parent === null) {
            this._root = tempNode;
        }

        this.__fixHeight(rootNode);
        this.__fixHeight(tempNode);

        return tempNode;
    }

    // Right-Right Heavy (RR)
    private __rotateLeft(rootNode: AVLTreeNode<T>): AVLTreeNode<T> {
        const tempNode: AVLTreeNode<T> = rootNode.right as AVLTreeNode<T>;
        rootNode.right = tempNode.left;
        tempNode.left = rootNode;

        tempNode.parent = rootNode.parent;
        rootNode.parent = tempNode;

        if (tempNode.parent === null) {
            this._root = tempNode;
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
}
