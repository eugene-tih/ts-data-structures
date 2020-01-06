import { IBinaryTreeNodeCommon } from "./IBinaryTreeNodeCommon";

export class AbstractBinaryTreeNode<T> implements IBinaryTreeNodeCommon<T> {
    left: AbstractBinaryTreeNode<T> | null;
    right: AbstractBinaryTreeNode<T> | null;
    value: T;

    constructor(value: T) {
        this.right = null;
        this.left = null;
        this.value = value;
    }
}
