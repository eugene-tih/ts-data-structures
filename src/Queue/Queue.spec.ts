import {Queue} from './Queue';

describe('Queue', () => {
    it('should create empty structure with default property values', () => {
        const myQueue = new Queue<string>();

        expect(myQueue.count).toBe(0);
    });

    describe('Tests connected to insertion', () => {
        it('should insert one item', () => {
            const myQueue = new Queue<string>();

            myQueue.enqueue('One');

            expect(myQueue.count).toBe(1);
            expect(myQueue.peek()).toBe('One');
        });

        it('should insert bunch of items', () => {
            const myQueue = new Queue<string>();

            myQueue.enqueue('One');
            myQueue.enqueue('Two');
            myQueue.enqueue('Three');
            myQueue.enqueue('Four');
            myQueue.enqueue('Five');

            expect(myQueue.count).toBe(5);
            expect(myQueue.peek()).toBe('One');
        });
    });

    describe('Tests connected to peeking', () => {
        it('should peek an item', () => {
            const myQueue = new Queue<string>();

            myQueue.enqueue('One');
            myQueue.enqueue('Two');

            expect(myQueue.peek()).toBe('One');
        });

        it('should throw an error if queue is empty', () => {
            const myQueue = new Queue<string>();

            expect(() => {
                myQueue.peek();
            }).toThrowError();
        });
    });

    describe('Tests connected to containing', () => {
        it('should return `true` if contains item', () => {
            const myQueue = new Queue<string>();

            myQueue.enqueue('One');
            myQueue.enqueue('Two');
            myQueue.enqueue('Three');

            expect(myQueue.contains('Two')).toBe(true);
        });

        it('should return `false` if does not contain item', () => {
            const myQueue = new Queue<string>();

            myQueue.enqueue('One');
            myQueue.enqueue('Two');
            myQueue.enqueue('Three');

            expect(myQueue.contains('Five')).toBe(false);
        });
    });

    describe('Tests connected to removing', () => {
        it('should remove one item', () => {
            const myQueue = new Queue<string>();

            myQueue.enqueue('One');
            myQueue.dequeue();

            expect(myQueue.count).toBe(0);
            expect(myQueue.contains('One')).toBe(false);
        });

        it('should remove bunch of items', () => {
            const myQueue = new Queue<string>();

            myQueue.enqueue('One');
            myQueue.enqueue('Two');
            myQueue.enqueue('Three');

            myQueue.dequeue();
            myQueue.dequeue();

            expect(myQueue.count).toBe(1);
            expect(myQueue.contains('One')).toBe(false);
            expect(myQueue.peek()).toBe('Three');
        });

        it('should throw an error if queue is empty', () => {
            const myQueue = new Queue<string>();

            expect(() => {
                myQueue.dequeue();
            }).toThrowError();
        });
    });

    it('should return array of items', () => {
        const myQueue = new Queue<string>();

        myQueue.enqueue('One');
        myQueue.enqueue('Two');
        myQueue.enqueue('Three');

        expect(myQueue.toArray()).toStrictEqual(['One', 'Two', 'Three']);
    });

    it('should clear structure', () => {
        const myQueue = new Queue<string>();

        myQueue.enqueue('One');
        myQueue.enqueue('Two');
        myQueue.enqueue('Three');

        myQueue.clear();

        expect(myQueue.count).toBe(0);
        expect(myQueue.toArray()).toStrictEqual([]);
    });

    it('should copy values to array', () => {
        const myQueue = new Queue<string>();

        myQueue.enqueue('One');
        myQueue.enqueue('Two');
        myQueue.enqueue('Three');

        const array: string[] = [];

        myQueue.copyTo(array);

        expect(array).toStrictEqual(['One', 'Two', 'Three']);
    });
});
