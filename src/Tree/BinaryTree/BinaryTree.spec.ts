import {BinaryTree} from './BinaryTree';

describe('BinaryTree', () => {
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

    it('should find an item', () => {
        const binaryTree = new BinaryTree<string>();

        binaryTree
            .insert('Hello')
            .insert('World')
            .insert('John')
            .insert('Wayne');

        expect(binaryTree.search('John').value).toBe('John');
    });

    it('should remove an item', () => {
        const binaryTree = new BinaryTree<string>();

        binaryTree
            .insert('Hello')
            .insert('World')
            .insert('John')
            .insert('Wayne');

        binaryTree.remove('John');

        expect(binaryTree.search('John')).toBeNull();
    })
});
