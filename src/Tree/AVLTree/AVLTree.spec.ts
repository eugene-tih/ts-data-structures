import {AVLTree} from './AVLTree';

describe('AVLTree', () => {
    describe('Tests connected to insertion', () => {
        it('should insert one item', () => {
            const avlTree = new AVLTree<number>();

            avlTree.insert(4);
            expect(avlTree.getSize()).toBe(1);
            expect(avlTree.getHeight()).toBe(0);
        });

        it('should insert bunch of items', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(6)
                .insert(7);

            expect(avlTree.getSize()).toBe(3);
            expect(avlTree.getHeight()).toBe(1);
        });

        it('should not insert already inserted item', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(6)
                .insert(5)
                .insert(7)
                .insert(2)
                .insert(4);

            expect(avlTree.getSize()).toBe(5);
            expect(avlTree.getHeight()).toBe(2);
        });
    });

    describe('Tests connected to searching', () => {
        it('should find an item', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(2)
                .insert(6)
                .insert(1)
                .insert(3);

            const result = avlTree.search(3);

            expect(result!.value).toBe(3);
        });

        it('should return `null` if could not find an item', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(2)
                .insert(6)
                .insert(1)
                .insert(3);

            const result = avlTree.search(100);

            expect(result).toBeNull();
        });
    });

    describe('Tests connected to removing', () => {
        it('should remove a root item that has no children', () => {
            const avlTree = new AVLTree<number>();

            avlTree.insert(4);

            avlTree.remove(4);

            expect(avlTree.search(4)).toBeNull();
            expect(avlTree.getSize()).toBe(0);
            expect(avlTree.getHeight()).toBe(-1);
        });

        it('should remove a root item that has one child', () => {
            const avlTree = new AVLTree<number>();

            avlTree.insert(4).insert(2);

            avlTree.remove(4);

            expect(avlTree.search(4)).toBeNull();
            expect(avlTree.getSize()).toBe(1);
            expect(avlTree.getHeight()).toBe(0);
        });

        it('should remove a root item that has two children', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(2)
                .insert(7)
                .insert(1)
                .insert(3)
                .insert(5)
                .insert(6);

            avlTree.remove(4);

            expect(avlTree.search(4)).toBeNull();
            expect(avlTree.getSize()).toBe(6);
            expect(avlTree.getHeight()).toBe(2);
        });

        it('should throw an error if could not remove an item', () => {
            const avlTree = new AVLTree<number>();

            avlTree.insert(10);

            expect(() => {
                avlTree.remove(11);
            }).toThrowError();
            expect(avlTree.getSize()).toBe(1);
            expect(avlTree.getHeight()).toBe(0);
        });
    });

    describe('Tests connected to right items order', () => {
        it('should insert items to create complete tree', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(7)
                .insert(6)
                .insert(8)
                .insert(2)
                .insert(5)
                .insert(9);

            const avlTreeNode = avlTree.root;

            // parent
            expect(avlTreeNode!.value).toBe(6);
            expect(avlTreeNode!.parent).toBeNull();

            expect(avlTreeNode!.left!.value).toBe(4);
            expect(avlTreeNode!.left!.parent!.value).toBe(6);
            expect(avlTreeNode!.right!.value).toBe(8);
            expect(avlTreeNode!.right!.parent!.value).toBe(6);

            expect(avlTreeNode!.left!.left!.value).toBe(2);
            expect(avlTreeNode!.left!.left!.parent!.value).toBe(4);
            expect(avlTreeNode!.left!.right!.value).toBe(5);
            expect(avlTreeNode!.left!.right!.parent!.value).toBe(4);

            expect(avlTreeNode!.right!.left!.value).toBe(7);
            expect(avlTreeNode!.right!.left!.parent!.value).toBe(8);
            expect(avlTreeNode!.right!.right!.value).toBe(9);
            expect(avlTreeNode!.right!.right!.parent!.value).toBe(8);
        });

        it('should save right items order after removing root item with one child', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(2)
                .insert(5)
                .insert(6);

            avlTree.remove(5);

            const avlTreeNode = avlTree.root;

            expect(avlTreeNode!.value).toBe(4);
            expect(avlTreeNode!.parent).toBeNull();

            expect(avlTreeNode!.left!.value).toBe(2);
            expect(avlTreeNode!.left!.parent!.value).toBe(4);
            expect(avlTreeNode!.right!.value).toBe(6);
            expect(avlTreeNode!.right!.parent!.value).toBe(4);
        });

        it('should save right items order after removing root item with two children', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(8)
                .insert(7)
                .insert(9)
                .insert(11)
                .insert(12)
                .insert(10)
                .insert(14)
                .insert(16);

            avlTree.remove(11);
            avlTree.remove(10);

            const avlTreeNode = avlTree.root;

            expect(avlTreeNode!.value).toBe(9);
            expect(avlTreeNode!.parent).toBeNull();

            expect(avlTreeNode!.left!.value).toBe(8);
            expect(avlTreeNode!.left!.parent!.value).toBe(9);
            expect(avlTreeNode!.right!.value).toBe(14);
            expect(avlTreeNode!.right!.parent!.value).toBe(9);

            expect(avlTreeNode!.left!.left!.value).toBe(7);
            expect(avlTreeNode!.left!.left!.parent!.value).toBe(8);
            expect(avlTreeNode!.left!.right).toBeNull();
            expect(avlTreeNode!.right!.left!.value).toBe(12);
            expect(avlTreeNode!.right!.left!.parent!.value).toBe(14);
            expect(avlTreeNode!.right!.right!.value).toBe(16);
            expect(avlTreeNode!.right!.right!.parent!.value).toBe(14);
        });
    });

    describe('Tests connected to traversing', () => {
        it('should return items in inOrder order', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(2)
                .insert(1)
                .insert(3)
                .insert(6)
                .insert(5)
                .insert(7);

            const result = avlTree.traverseInOrder();

            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
        });

        it('should return items in preOrder order', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(2)
                .insert(1)
                .insert(3)
                .insert(6)
                .insert(5)
                .insert(7);

            const result = avlTree.traversePreOrder();

            expect(result).toEqual([4, 2, 1, 3, 6, 5, 7]);
        });

        it('should return items in postOrder order', () => {
            const avlTree = new AVLTree<number>();

            avlTree
                .insert(4)
                .insert(2)
                .insert(1)
                .insert(3)
                .insert(6)
                .insert(5)
                .insert(7);

            const result = avlTree.traversePostOrder();

            expect(result).toEqual([1, 3, 2, 5, 7, 6, 4]);
        });
    });
});
