import { IBinaryTreeCommon } from "./IBinaryTreeCommon";
import { AbstractBinaryTreeNode } from "./AbstractBinaryTreeNode";
import { IBinaryTreeNodeCommon } from "./IBinaryTreeNodeCommon";

export abstract class AbstractBinaryTree<T> implements IBinaryTreeCommon<T> {
    protected _parent: AbstractBinaryTreeNode<T> | null;
    protected _size: number;

    private __errorName: string;

    protected constructor(className: string) {
        this.__errorName = "T" + className;
        this._parent = null;
        this._size = 0;
    }

    public compare(valueA: T, valueB: T): number {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }

    public getSize(): number {
        return this._size;
    }

    public getHeight(): number {
        let height: number = -1;

        if (!this._parent) {
            return height;
        }

        let currentNode: AbstractBinaryTreeNode<T> = this._parent;
        const stack: AbstractBinaryTreeNode<T>[] = [currentNode];

        do {
            height += 1;

            let i: number;
            let len: number;
            for (i = 0, len = stack.length; i < len; i += 1) {
                currentNode = stack.pop() as AbstractBinaryTreeNode<T>;

                if (currentNode.left !== null) {
                    stack.push(currentNode.left);
                }
                if (currentNode.right !== null) {
                    stack.push(currentNode.right);
                }
            }
        } while (stack.length);

        stack.length = 0;
        return height;
    }

    public abstract insert(value: T): this;

    public abstract remove(value: T): this;

    public abstract search(value: T): IBinaryTreeNodeCommon<T> | null;

    public traverseInOrder(): T[] {
        if (!this._parent) {
            return [];
        }

        let currentNode: IBinaryTreeNodeCommon<T> | null = this._parent;
        const stack: IBinaryTreeNodeCommon<T>[] = [];
        const list: T[] = [];

        while (currentNode || stack.length) {
            while (currentNode) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            }

            currentNode = stack.pop() as IBinaryTreeNodeCommon<T>;
            list.push(currentNode.value);

            currentNode = currentNode.right;
        }

        return list;
    }

    public traversePreOrder(): T[] {
        if (!this._parent) {
            return [];
        }

        let currentNode: IBinaryTreeNodeCommon<T> | null = this._parent;
        const stack: IBinaryTreeNodeCommon<T>[] = [currentNode];
        const list: T[] = [];

        while (stack.length) {
            currentNode = stack.pop() as IBinaryTreeNodeCommon<T>;
            list.push(currentNode.value);

            if (currentNode.right) {
                stack.push(currentNode.right);
            }

            if (currentNode.left) {
                stack.push(currentNode.left);
            }
        }

        return list;
    }

    public traversePostOrder(): T[] {
        if (!this._parent) {
            return [];
        }

        let currentNode: IBinaryTreeNodeCommon<T> | null = this._parent;
        const stack: IBinaryTreeNodeCommon<T>[] = [];
        const list: T[] = [];

        do {
            while (currentNode) {
                if (currentNode.right) {
                    stack.push(currentNode.right);
                }

                stack.push(currentNode);
                currentNode = currentNode.left;
            }

            currentNode = stack.pop() as IBinaryTreeNodeCommon<T>;

            if (
                currentNode.right &&
                stack[stack.length - 1] === currentNode.right
            ) {
                stack.pop();
                stack.push(currentNode);
                currentNode = currentNode.right;
                continue;
            }

            list.push(currentNode.value);
            currentNode = null;
        } while (stack.length);

        return list;
    }

    protected _errorCreator(message: string): Error {
        const error = new Error(message);
        error.name = this.__errorName;
        return error;
    }
}
