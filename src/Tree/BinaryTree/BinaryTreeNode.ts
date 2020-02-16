import {AbstractBinaryTreeNode} from '../AbstractBinaryTreeNode';

export class BinaryTreeNode<T> extends AbstractBinaryTreeNode<T> {
    public constructor(value: T) {
        super(value);
    }
}
