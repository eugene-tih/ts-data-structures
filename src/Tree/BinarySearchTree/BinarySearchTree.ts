import { AbstractBinaryTree } from "../AbstractBinaryTree";
import { BinaryTreeNode } from "../BinaryTree/BinaryTreeNode";

export class BinarySearchTree<T> extends AbstractBinaryTree<T> {
    public constructor() {
        super("BinarySearchTree");
    }

    public insert(value: T): this {
        const compare = this.compare;
        this._size += 1;

        if (!this._parent) {
            this._parent = new BinaryTreeNode(value);

            return this;
        }

        let currentNode: BinaryTreeNode<T> = this._parent;
        let compareResult: number;

        while (currentNode) {
            compareResult = compare(currentNode.value, value);

            if (compareResult > 0) {
                if (currentNode.right === null) {
                    currentNode.right = new BinaryTreeNode(value);
                    break;
                }

                currentNode = currentNode.right;
                continue;
            }
        }

        return this;
    }
}
