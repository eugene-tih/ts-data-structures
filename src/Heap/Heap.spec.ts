import {Heap} from './Heap';

describe('Heap', () => {
    it('should create empty structure with default property values', () => {
        const heap = new Heap();

        expect(heap.count).toBe(0);
    });

    describe('Tests connected to insertion', () => {
        it('should insert one item', () => {
            const heap = new Heap<number>();

            heap.insert(10);

            expect(heap.count).toBe(1);
            expect(heap.getMaxItem()).toBe(10);
        });

        it('should insert bunch of items', () => {
            const heap = new Heap<number>();

            heap.insert(4)
                .insert(6)
                .insert(7);

            expect(heap.count).toBe(3);
            expect(heap.getMaxItem()).toBe(7);
        });
    });

    describe('Tests connected to containing', () => {
        it('should return `true` if contains item', () => {
            const heap = new Heap<number>();

            heap.insert(4)
                .insert(2)
                .insert(6)
                .insert(1)
                .insert(3);

            const result = heap.contains(3);

            expect(result).toBe(true);
        });

        it('should return `false` if does not contain item', () => {
            const heap = new Heap<number>();

            heap.insert(4)
                .insert(2)
                .insert(6)
                .insert(1)
                .insert(3);

            const result = heap.contains(100);

            expect(result).toBe(false);
        });
    });

    describe('Tests connected to removing', () => {
        it('should root item that has no children', () => {
            const heap = new Heap<number>();

            heap.insert(4);

            heap.remove(4);

            expect(heap.count).toBe(0);
            expect(heap.contains(4)).toBe(false);
            expect(heap.getMaxItem()).toBeNull();
        });

        it('should remove a root item that has one child', () => {
            const heap = new Heap<number>();

            heap.insert(4).insert(2);

            heap.remove(4);

            expect(heap.count).toBe(1);
            expect(heap.contains(4)).toBe(false);
            expect(heap.getMaxItem()).toBe(2);
        });

        it('should remove a root item that has two children', () => {
            const heap = new Heap<number>();

            heap.insert(4)
                .insert(2)
                .insert(7)
                .insert(1)
                .insert(3)
                .insert(5)
                .insert(6);

            heap.remove(7);

            expect(heap.count).toBe(6);
            expect(heap.contains(7)).toBe(false);
            expect(heap.getMaxItem()).toBe(6);
        });

        it('should throw an error if could not remove an item', () => {
            const heap = new Heap<number>();

            heap.insert(10);

            expect(() => {
                heap.remove(11);
            }).toThrowError();
            expect(heap.count).toBe(1);
        });
    });

    describe('Tests connected to right items order', () => {
        it('should insert items to create complete tree', () => {
            const heap = new Heap<number>();

            heap.insert(4)
                .insert(7)
                .insert(6)
                .insert(8)
                .insert(2)
                .insert(5)
                .insert(9);

            expect(heap.toArray()).toStrictEqual([9, 7, 8, 4, 2, 5, 6]);
        });

        it('should save right items order after removing root item with one child', () => {
            const heap = new Heap<number>();

            heap.insert(4)
                .insert(2)
                .insert(5)
                .insert(6);

            heap.remove(5);

            expect(heap.toArray()).toStrictEqual([6, 2, 4]);
        });

        it('should save right items order after removing root item with two children', () => {
            const heap = new Heap<number>();

            heap.insert(8)
                .insert(7)
                .insert(9)
                .insert(11)
                .insert(12)
                .insert(10)
                .insert(14)
                .insert(16);

            heap.remove(11);
            heap.remove(10);

            expect(heap.toArray()).toStrictEqual([16, 14, 12, 7, 9, 8]);
        });

        it('should save right items order after removing top root item with two children', () => {
            const heap = new Heap<number>();

            heap.insert(10)
                .insert(4)
                .insert(6)
                .insert(2)
                .insert(1);

            heap.remove(10);

            expect(heap.toArray()).toStrictEqual([6, 4, 1, 2]);
        });
    });

    it('should clear structure', () => {
        const heap = new Heap<number>();

        heap.insert(10)
            .insert(20)
            .insert(5);

        heap.clear();

        expect(heap.count).toBe(0);
        expect(heap.contains(5)).toBe(false);
    });

    it('should copy values to array', () => {
        const heap = new Heap<number>();

        heap.insert(10)
            .insert(20)
            .insert(5);

        const array: number[] = [];

        heap.copyTo(array);

        expect(array).toEqual([20, 10, 5]);
    });
});
