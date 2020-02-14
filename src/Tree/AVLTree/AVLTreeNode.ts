import {AbstractBinaryTreeNode} from '../AbstractBinaryTreeNode';

export class AVLTreeNode<T> extends AbstractBinaryTreeNode<T> {
    public height: number;

    public constructor(value: T) {
        super(value);
        this.height = 1;
    }
}
