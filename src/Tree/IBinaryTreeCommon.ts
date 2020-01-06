import { IComparer } from "../IComparer";
import { IBinaryTreeNodeCommon } from "./IBinaryTreeNodeCommon";

export interface IBinaryTreeCommon<T> extends IComparer<T, T> {
    compare(valueA: T, valueB: T): number;

    getSize(): number; // Returns the number of elements in the IBinaryTreeCommon<T>
    getHeight(): number; // Return the distance (edge count) between the farthest leaf to the root in the IBinaryTreeCommon<T>

    insert(value: T): this;
    remove(value: T): this;
    search(value: T): IBinaryTreeNodeCommon<T> | null;

    traverseInOrder(): T[]; // Visit nodes on this order: left, parent, right in the IBinaryTreeCommon<T>
    traversePreOrder(): T[]; // Visit nodes on this order: parent, left, right in the IBinaryTreeCommon<T>
    traversePostOrder(): T[]; // Visit nodes on this order: left, right, parent in the IBinaryTreeCommon<T>
}
