import {IBinaryTreeNodeCommon} from './IBinaryTreeNodeCommon';

export class AbstractBinaryTreeNode<T> implements IBinaryTreeNodeCommon<T> {
    // @TODO Realize parent integration
    public parent: this | null;
    public left: this | null;
    public right: this | null;
    public value: T;

    constructor(value: T) {
        this.parent = null;
        this.right = null;
        this.left = null;
        this.value = value;
    }
}
