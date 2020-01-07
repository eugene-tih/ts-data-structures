import {BinarySearchTree} from './BinarySearchTree';

describe('BinarySearchTree', () => {
    describe('Tests connected to insertion', () => {
        it('should insert one item', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree.insert(4);

            expect(binarySearchTree.getSize()).toBe(1);
            expect(binarySearchTree.getHeight()).toBe(0);
        });

        it('should insert bunch of items', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(6)
                .insert(1)
                .insert(3);

            expect(binarySearchTree.getSize()).toBe(5);
            expect(binarySearchTree.getHeight()).toBe(2);
        });
    });

    describe('Tests connected to searching', () => {
        it('should find an item', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(6)
                .insert(1)
                .insert(3);

            const result = binarySearchTree.search(3);

            expect(result!.value).toBe(3);
        });

        it('should return `null` if could not find an item', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(6)
                .insert(1)
                .insert(3);

            const result = binarySearchTree.search(100);

            expect(result).toBeNull();
        });
    });

    describe('Tests connected to removing', () => {
        it('should remove a root item that has no children', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree.insert(4);

            binarySearchTree.remove(4);

            expect(binarySearchTree.search(4)).toBeNull();
            expect(binarySearchTree.getSize()).toBe(0);
            expect(binarySearchTree.getHeight()).toBe(-1);
        });

        it('should remove a root item that has one child', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree.insert(4).insert(2);

            binarySearchTree.remove(4);

            expect(binarySearchTree.search(4)).toBeNull();
            expect(binarySearchTree.getSize()).toBe(1);
            expect(binarySearchTree.getHeight()).toBe(0);
        });

        it('should remove a root item that has two children', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(7)
                .insert(1)
                .insert(3)
                .insert(5)
                .insert(6);
            binarySearchTree.remove(4);

            expect(binarySearchTree.search(4)).toBeNull();
            expect(binarySearchTree.getSize()).toBe(5);
            expect(binarySearchTree.getHeight()).toBe(3);
        });

        it('should throw an error if could not remove an item', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree.insert(10);

            expect(() => {
                binarySearchTree.remove(11);
            }).toThrowError();
            expect(binarySearchTree.getSize()).toBe(1);
            expect(binarySearchTree.getHeight()).toBe(0);
        });
    });

    describe('Tests connected to right items order', () => {
        it('should insert items to create complete tree', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(1)
                .insert(3)
                .insert(6)
                .insert(5)
                .insert(7);

            const binarySearchTreeNode = binarySearchTree.root;

            expect(binarySearchTreeNode!.value).toBe(4);
            expect(binarySearchTreeNode!.left!.value).toBe(2);
            expect(binarySearchTreeNode!.right!.value).toBe(6);
            expect(binarySearchTreeNode!.left!.left!.value).toBe(1);
            expect(binarySearchTreeNode!.left!.right!.value).toBe(3);
            expect(binarySearchTreeNode!.right!.left!.value).toBe(5);
            expect(binarySearchTreeNode!.right!.right!.value).toBe(7);
        });

        it('should save right items order after removing root item with one child', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(1);

            binarySearchTree.remove(4);

            const binarySearchTreeNode = binarySearchTree.root;

            expect(binarySearchTreeNode!.value).toBe(2);
            expect(binarySearchTreeNode!.left!.value).toBe(1);
            expect(binarySearchTreeNode!.right).toBeNull();
        });

        it('should save right items order after removing root item with two children', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(1)
                .insert(3)
                .insert(6)
                .insert(5)
                .insert(7);
            binarySearchTree.remove(4);

            const binarySearchTreeNode = binarySearchTree.root;

            expect(binarySearchTreeNode!.value).toBe(5);
            expect(binarySearchTreeNode!.left!.value).toBe(2);
            expect(binarySearchTreeNode!.right!.value).toBe(6);
            expect(binarySearchTreeNode!.left!.left!.value).toBe(1);
            expect(binarySearchTreeNode!.left!.right!.value).toBe(3);
            expect(binarySearchTreeNode!.right!.right!.value).toBe(7);
            expect(binarySearchTreeNode!.right!.left).toBeNull();
        });
    });

    describe('Tests connected to traversing', () => {
        it('should return items in inOrder order', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(1)
                .insert(3)
                .insert(6)
                .insert(5)
                .insert(7);

            const result = binarySearchTree.traverseInOrder();

            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
        });

        it('should return items in preOrder order', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(1)
                .insert(3)
                .insert(6)
                .insert(5)
                .insert(7);

            const result = binarySearchTree.traversePreOrder();

            expect(result).toEqual([4, 2, 1, 3, 6, 5, 7]);
        });

        it('should return items in postOrder order', () => {
            const binarySearchTree = new BinarySearchTree<number>();

            binarySearchTree
                .insert(4)
                .insert(2)
                .insert(1)
                .insert(3)
                .insert(6)
                .insert(5)
                .insert(7);

            const result = binarySearchTree.traversePostOrder();

            expect(result).toEqual([1, 3, 2, 5, 7, 6, 4]);
        });
    });
});
