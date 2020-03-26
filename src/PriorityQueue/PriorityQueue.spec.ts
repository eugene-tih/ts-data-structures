import {PriorityQueue} from './PriorityQueue';

describe('PriorityQueue', () => {
    it('should create empty structure with default property values', () => {
        const myPriorityQueue = new PriorityQueue<string>();

        expect(myPriorityQueue.count).toBe(0);
    });

    describe('Tests connected to enqueuing', () => {
        it('should enqueue one item', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('One', 1);

            expect(myPriorityQueue.count).toBe(1);
            expect(myPriorityQueue.peek()).toBe('One');
        });

        it('should enqueue bunch of items', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Three', 3);
            myPriorityQueue.enqueue('Four', 4);
            myPriorityQueue.enqueue('One', 1);
            myPriorityQueue.enqueue('Five', 5);
            myPriorityQueue.enqueue('Two', 2);

            expect(myPriorityQueue.count).toBe(5);
            expect(myPriorityQueue.peek()).toBe('One');
        });

        it('should enqueue bunch of items different types', () => {
            const myPriorityQueue = new PriorityQueue<any>();

            myPriorityQueue.enqueue(3, 3);
            myPriorityQueue.enqueue(null, 4);
            myPriorityQueue.enqueue(true, 1);

            expect(myPriorityQueue.count).toBe(3);
            expect(myPriorityQueue.peek()).toBe(true);
        });

        it('should throw an error if enqueue item with negative priority', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            expect(() => {
                myPriorityQueue.enqueue('One', -1);
            }).toThrowError();
            expect(myPriorityQueue.count).toBe(0);
        });
    });

    describe('Tests connected to peeking', () => {
        it('should peek an item', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('One', 1);

            expect(myPriorityQueue.peek()).toBe('One');
        });

        it('should multiple peeking return the same element', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('One', 1);

            expect(myPriorityQueue.peek()).toBe('One');
            expect(myPriorityQueue.peek()).toBe('One');
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

    describe('Tests connected to dequeuing', () => {
        it('should deque one item without children', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('One', 1);
            const result = myPriorityQueue.dequeue();

            expect(result).toBe('One');
            expect(myPriorityQueue.contains('One')).toBe(false);
            expect(myPriorityQueue.count).toBe(0);
        });

        it('should deque one item with children', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Ten', 10);
            myPriorityQueue.enqueue('Four', 4);
            myPriorityQueue.enqueue('Six', 6);
            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('One', 1);

            const result = myPriorityQueue.dequeue();

            expect(result).toBe('One');
            expect(myPriorityQueue.count).toBe(4);
            expect(myPriorityQueue.contains('One')).toBe(false);
            expect(myPriorityQueue.peek()).toBe('Two');
        });

        it('should deque bunch of items', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Two', 2);
            myPriorityQueue.enqueue('Three', 3);
            myPriorityQueue.enqueue('One', 1);

            myPriorityQueue.dequeue();
            myPriorityQueue.dequeue();

            expect(myPriorityQueue.count).toBe(1);
            expect(myPriorityQueue.contains('One')).toBe(false);
            expect(myPriorityQueue.contains('Two')).toBe(false);
            expect(myPriorityQueue.peek()).toBe('Three');
        });

        it('should deque bunch of items with the same priority in the same order as they were enqueued', () => {
            const myPriorityQueue = new PriorityQueue<string>();

            myPriorityQueue.enqueue('Should be first', 2);
            myPriorityQueue.enqueue('Should be second', 2);

            const result1 = myPriorityQueue.dequeue();
            const result2 = myPriorityQueue.dequeue();

            expect(result1).toBe('Should be first');
            expect(result2).toBe('Should be second');
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

    it('should copy values to array begging from specific index', () => {
        const myPriorityQueue = new PriorityQueue<string>();

        myPriorityQueue.enqueue('Three', 3);
        myPriorityQueue.enqueue('Two', 2);
        myPriorityQueue.enqueue('One', 1);

        const array: string[] = ['My array'];

        myPriorityQueue.copyTo(array, 1);

        expect(array).toStrictEqual(['My array', 'One', 'Three', 'Two']);
    });
});
