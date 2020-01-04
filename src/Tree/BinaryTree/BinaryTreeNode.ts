import {IBinaryTreeNodeCommon} from '../IBinaryTreeNodeCommon';

export class BinaryTreeNode<T> implements IBinaryTreeNodeCommon<T> {
    public right: IBinaryTreeNodeCommon<T> | null;
    public left: IBinaryTreeNodeCommon<T> | null;
    public value: T;

    constructor(value: T) {
        this.right = null;
        this.left = null;
        this.value = value;
    }
}
