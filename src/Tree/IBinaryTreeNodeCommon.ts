export interface IBinaryTreeNodeCommon<T> {
    parent: this | null;
    left: this | null;
    right: this | null;
    value: T;
}
