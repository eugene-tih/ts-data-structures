import {BinaryTree} from './BinaryTree';

describe('BinaryTree', () => {
    describe('Tests connected to insertion', () => {
        it('should insert one item', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree.insert('Hello');

            expect(binaryTree.getSize()).toBe(1);
            expect(binaryTree.getHeight()).toBe(0);
        });

        it('should insert bunch of items', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne');

            expect(binaryTree.getSize()).toBe(4);
            expect(binaryTree.getHeight()).toBe(2);
        });
    });

    describe('Tests connected to searching', () => {
        it('should find an item', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne');

            expect(binaryTree.search('John')!.value).toBe('John');
        });

        it('should return `null` if could not find an item', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne');

            expect(binaryTree.search('Ingrid Bergman')).toBeNull();
        });
    });

    describe('Tests connected to removing', () => {
        it('should remove an item', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne');

            binaryTree.remove('John');

            expect(binaryTree.search('John')).toBeNull();
            expect(binaryTree.getSize()).toBe(3);
            expect(binaryTree.getHeight()).toBe(2);
        });

        it('should remove a root item', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree.insert('Hello');
            binaryTree.remove('Hello');

            expect(binaryTree.search('Hello')).toBeNull();
            expect(binaryTree.getSize()).toBe(0);
            expect(binaryTree.getHeight()).toBe(-1);
        });

        it('should throw an error if could not remove an item', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree.insert('Hello');

            expect(() => {
                binaryTree.remove('World');
            }).toThrowError();
            expect(binaryTree.getSize()).toBe(1);
            expect(binaryTree.getHeight()).toBe(0);
        });
    });

    describe('Tests connected to right items order', () => {
        it('should insert items to create complete tree', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne')
                .insert('Clint')
                .insert('Eastwood');

            const binaryTreeNode = binaryTree.root;

            expect(binaryTreeNode!.value).toBe('Hello');
            expect(binaryTreeNode!.left!.value).toBe('World');
            expect(binaryTreeNode!.right!.value).toBe('John');
            expect(binaryTreeNode!.left!.left!.value).toBe('Wayne');
            expect(binaryTreeNode!.left!.right!.value).toBe('Clint');
            expect(binaryTreeNode!.right!.left!.value).toBe('Eastwood');
        });

        it('should save right items order after removing one of them', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne')
                .insert('Clint')
                .insert('Eastwood');

            binaryTree.remove('Wayne');
            const binaryTreeNode = binaryTree.root;

            expect(binaryTreeNode!.value).toBe('Hello');
            expect(binaryTreeNode!.left!.value).toBe('World');
            expect(binaryTreeNode!.right!.value).toBe('John');
            expect(binaryTreeNode!.left!.left!.value).toBe('Eastwood');
            expect(binaryTreeNode!.left!.right!.value).toBe('Clint');
            expect(binaryTreeNode!.right!.left).toBeNull();
        });
    });

    describe('Tests connected to traversing', () => {
        it('should return items in inOrder order', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne')
                .insert('Clint')
                .insert('Eastwood');

            expect(binaryTree.traverseInOrder()).toEqual(['Wayne', 'World', 'Clint', 'Hello', 'Eastwood', 'John']);
        });

        it('should return items in preOrder order', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne')
                .insert('Clint')
                .insert('Eastwood');

            expect(binaryTree.traversePreOrder()).toEqual(['Hello', 'World', 'Wayne', 'Clint', 'John', 'Eastwood']);
        });

        it('should return items in postOrder order', () => {
            const binaryTree = new BinaryTree<string>();

            binaryTree
                .insert('Hello')
                .insert('World')
                .insert('John')
                .insert('Wayne')
                .insert('Clint')
                .insert('Eastwood');

            expect(binaryTree.traversePostOrder()).toEqual(['Wayne', 'Clint', 'World', 'Eastwood', 'John', 'Hello']);
        });
    });
});
