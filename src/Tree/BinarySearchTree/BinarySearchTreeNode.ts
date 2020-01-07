import { AbstractBinaryTreeNode } from "../AbstractBinaryTreeNode";

export class BinarySearchTreeNode<T> extends AbstractBinaryTreeNode<T> {
    public constructor(value: T) {
        super(value);
    }
}
