export interface IBinaryTreeNodeCommon<T> {
    left: IBinaryTreeNodeCommon<T> | null;
    right: IBinaryTreeNodeCommon<T> | null;
    value:  T;
}
