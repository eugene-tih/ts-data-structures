import {PriorityQueue} from './PriorityQueue';

describe('PriorityQueue', () => {
    it('should create empty structure with default property values', () => {
        const myPriorityQueue = new PriorityQueue<string>();

        expect(myPriorityQueue.count).toBe(0);
    });

    describe('Tests connected to insertion', () => {
        it('should insert one item', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('One', 1);

            expect(myPriorityQueue.count).toBe(1);
            expect(myPriorityQueue.peek()).toBe('One');
        });

        it('should insert bunch of items', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Three', 3);
            myPriorityQueue.enqueue('Four', 4);
            myPriorityQueue.enqueue('One', 1);
            myPriorityQueue.enqueue('Five', 5);
            myPriorityQueue.enqueue('Two', 2);

            expect(myPriorityQueue.count).toBe(5);
            expect(myPriorityQueue.peek()).toBe('One');
        });
    });

    describe('Tests connected to peeking', () => {
        it('should peek an item', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('One', 1);

            expect(myPriorityQueue.peek()).toBe('One');
        });

        it('should throw an error if priorityQueue is empty', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            expect(() => {
                myPriorityQueue.peek();
            }).toThrowError();
        });
    });

    describe('Tests connected to containing', () => {
        it('should return `true` if contains item', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('One', 1);
            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('Three', 3);

            expect(myPriorityQueue.contains('Two')).toBe(true);
        });

        it('should return `false` if does not contain item', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('One', 1);
            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('Three', 3);

            expect(myPriorityQueue.contains('Five')).toBe(false);
        });
    });

    describe('Tests connected to removing', () => {
        it('should remove one item', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('One', 1);
            myPriorityQueue.dequeue();

            expect(myPriorityQueue.count).toBe(0);
            expect(myPriorityQueue.contains('One')).toBe(false);
        });

        it('should remove one item with two children', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Ten', 10);
            myPriorityQueue.enqueue('Four', 4);
            myPriorityQueue.enqueue('Six', 6);
            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('One', 1);

            myPriorityQueue.dequeue();

            expect(myPriorityQueue.count).toBe(4);
            expect(myPriorityQueue.contains('One')).toBe(false);
            expect(myPriorityQueue.peek()).toBe('Two');
        });

        it('should remove bunch of items', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('Three', 3);
            myPriorityQueue.enqueue('One', 1);

            myPriorityQueue.dequeue();
            myPriorityQueue.dequeue();

            expect(myPriorityQueue.count).toBe(1);
            expect(myPriorityQueue.contains('One')).toBe(false);
            expect(myPriorityQueue.peek()).toBe('Three');
        });

        it('should throw an error if priorityQueue is empty', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            expect(() => {
                myPriorityQueue.dequeue();
            }).toThrowError();
        });
    });

    it('should return array of items', () => {
        const myPriorityQueue = new PriorityQueue<string>();

        myPriorityQueue.enqueue('Three', 3);
        myPriorityQueue.enqueue('Two', 2);
        myPriorityQueue.enqueue('One', 1);

        expect(myPriorityQueue.toArray()).toStrictEqual(['One', 'Three', 'Two']);
    });

    it('should clear structure', () => {
        const myPriorityQueue = new PriorityQueue<string>();

        myPriorityQueue.enqueue('One', 1);
        myPriorityQueue.enqueue('Two', 2);
        myPriorityQueue.enqueue('Three', 3);

        myPriorityQueue.clear();

        expect(myPriorityQueue.count).toBe(0);
        expect(myPriorityQueue.toArray()).toStrictEqual([]);
    });

    it('should copy values to array', () => {
        const myPriorityQueue = new PriorityQueue<string>();

        myPriorityQueue.enqueue('Three', 3);
        myPriorityQueue.enqueue('Two', 2);
        myPriorityQueue.enqueue('One', 1);

        const array: string[] = [];

        myPriorityQueue.copyTo(array);

        expect(array).toStrictEqual(['One', 'Three', 'Two']);
    });
});
