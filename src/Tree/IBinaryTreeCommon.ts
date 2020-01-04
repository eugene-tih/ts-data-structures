import {IComparer} from '../IComparer';
import {IBinaryTreeNodeCommon} from './IBinaryTreeNodeCommon';

export interface IBinaryTreeCommon<T> {
    setComparer(comparer: IComparer<T, T>): void;

    getSize(): number; // Returns the number of elements in the tree
    getHeight(): number; // Return the distance (edge count) between the farthest leaf to the root

    insert(value: T): this;
    remove(value: T): this;
    search(value: T): IBinaryTreeNodeCommon<T> | null;

    traverseInOrder(): T[];
    traversePreOrder(): T[];
    traversePostOrder(): T[];
}
