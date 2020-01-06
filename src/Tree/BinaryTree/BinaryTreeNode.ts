import { AbstractBinaryTreeNode } from "../AbstractBinaryTreeNode";

export class BinaryTreeNode<T> implements AbstractBinaryTreeNode<T> {
    public right: BinaryTreeNode<T> | null;
    public left: BinaryTreeNode<T> | null;
    public value: T;

    constructor(value: T) {
        this.right = null;
        this.left = null;
        this.value = value;
    }
}
