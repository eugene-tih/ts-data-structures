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
});
