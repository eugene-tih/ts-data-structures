import {PriorityQueue} from './PriorityQueue';

describe('PriorityQueue', () => {
    it('should create empty structure with default property values', () => {
        const myQueue = new PriorityQueue<string>();

        expect(myQueue.count).toBe(0);
    });

    describe('Tests connected to insertion', () => {
        it('should insert one item', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('One', 1);

            expect(myPriorityQueue.count).toBe(1);
            expect(myPriorityQueue.peek()).toBe('One');
        });

        it('should insert bunch of items', () => {
            const myQueue = new PriorityQueue<string>();

            myQueue.enqueue('Three', 3);
            myQueue.enqueue('Four', 4);
            myQueue.enqueue('One', 1);
            myQueue.enqueue('Five', 5);
            myQueue.enqueue('Two', 2);

            expect(myQueue.count).toBe(5);
            expect(myQueue.peek()).toBe('One');
        });
    });

    describe('Tests connected to peeking', () => {
        it('should peek an item', () => {
            const myQueue = new PriorityQueue<string>();

            myQueue.enqueue('Two', 2);
            myQueue.enqueue('One', 1);

            expect(myQueue.peek()).toBe('One');
        });

        it('should throw an error if priorityQueue is empty', () => {
            const myQueue = new PriorityQueue<string>();

            expect(() => {
                myQueue.peek();
            }).toThrowError();
        });
    });

    describe('Tests connected to containing', () => {
        it('should return `true` if contains item', () => {
            const myQueue = new PriorityQueue<string>();

            myQueue.enqueue('One', 1);
            myQueue.enqueue('Two', 2);
            myQueue.enqueue('Three', 3);

            expect(myQueue.contains('Two')).toBe(true);
        });

        it('should return `false` if does not contain item', () => {
            const myQueue = new PriorityQueue<string>();

            myQueue.enqueue('One', 1);
            myQueue.enqueue('Two', 2);
            myQueue.enqueue('Three', 3);

            expect(myQueue.contains('Five')).toBe(false);
        });
    });

    describe('Tests connected to removing', () => {
        it('should remove one item', () => {
            const myQueue = new PriorityQueue<string>();

            myQueue.enqueue('One', 1);
            myQueue.dequeue();

            expect(myQueue.count).toBe(0);
            expect(myQueue.contains('One')).toBe(false);
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
            const myQueue = new PriorityQueue<string>();

            myQueue.enqueue('Two', 2);
            myQueue.enqueue('Three', 3);
            myQueue.enqueue('One', 1);

            myQueue.dequeue();
            myQueue.dequeue();

            expect(myQueue.count).toBe(1);
            expect(myQueue.contains('One')).toBe(false);
            expect(myQueue.peek()).toBe('Three');
        });

        it('should throw an error if priorityQueue is empty', () => {
            const myQueue = new PriorityQueue<string>();

            expect(() => {
                myQueue.dequeue();
            }).toThrowError();
        });
    });

    it('should return array of items', () => {
        const myQueue = new PriorityQueue<string>();

        myQueue.enqueue('Three', 3);
        myQueue.enqueue('Two', 2);
        myQueue.enqueue('One', 1);

        expect(myQueue.toArray()).toStrictEqual(['One', 'Three', 'Two']);
    });

    it('should clear structure', () => {
        const myQueue = new PriorityQueue<string>();

        myQueue.enqueue('One', 1);
        myQueue.enqueue('Two', 2);
        myQueue.enqueue('Three', 3);

        myQueue.clear();

        expect(myQueue.count).toBe(0);
        expect(myQueue.toArray()).toStrictEqual([]);
    });

    it('should copy values to array', () => {
        const myQueue = new PriorityQueue<string>();

        myQueue.enqueue('Three', 3);
        myQueue.enqueue('Two', 2);
        myQueue.enqueue('One', 1);

        const array: string[] = [];

        myQueue.copyTo(array);

        expect(array).toStrictEqual(['One', 'Three', 'Two']);
    });
});
