import {Stack} from './Stack';

describe('Stack', () => {
    it('should create empty structure with default property values', () => {
        const myStack = new Stack<string>();

        expect(myStack.count).toBe(0);
    });

    describe('Tests connected to insertion', () => {
        it('should insert one item', () => {
            const myStack = new Stack<string>();

            myStack.push('One');

            expect(myStack.count).toBe(1);
            expect(myStack.peek()).toBe('One');
        });

        it('should insert bunch of items', () => {
            const myStack = new Stack<string>();

            myStack.push('One');
            myStack.push('Two');
            myStack.push('Three');
            myStack.push('Four');
            myStack.push('Five');

            expect(myStack.count).toBe(5);
            expect(myStack.peek()).toBe('Five');
        });
    });

    describe('Tests connected to peeking', () => {
        it('should peek an item', () => {
            const myStack = new Stack<string>();

            myStack.push('One');
            myStack.push('Two');

            expect(myStack.peek()).toBe('Two');
        });

        it('should throw an error if stack is empty', () => {
            const myStack = new Stack<string>();

            expect(() => {
                myStack.peek();
            }).toThrowError();
        });
    });

    describe('Tests connected to containing', () => {
        it('should return `true` if contains item', () => {
            const myStack = new Stack<string>();

            myStack.push('One');
            myStack.push('Two');
            myStack.push('Three');

            expect(myStack.contains('Two')).toBe(true);
        });

        it('should return `false` if does not contain item', () => {
            const myStack = new Stack<string>();

            myStack.push('One');
            myStack.push('Two');
            myStack.push('Three');

            expect(myStack.contains('Five')).toBe(false);
        });
    });

    describe('Tests connected to removing', () => {
        it('should remove one item', () => {
            const myStack = new Stack<string>();

            myStack.push('One');
            myStack.pop();

            expect(myStack.count).toBe(0);
            expect(myStack.contains('One')).toBe(false);
        });

        it('should remove bunch of items', () => {
            const myStack = new Stack<string>();

            myStack.push('One');
            myStack.push('Two');
            myStack.push('Three');

            myStack.pop();
            myStack.pop();

            expect(myStack.count).toBe(1);
            expect(myStack.contains('Three')).toBe(false);
            expect(myStack.peek()).toBe('One');
        });

        it('should throw an error if stack is empty', () => {
            const myStack = new Stack<string>();

            expect(() => {
                myStack.pop();
            }).toThrowError();
        });
    });

    it('should return array of items', () => {
        const myStack = new Stack<string>();

        myStack.push('One');
        myStack.push('Two');
        myStack.push('Three');

        expect(myStack.toArray()).toStrictEqual(['Three', 'Two', 'One']);
    });

    it('should clear structure', () => {
        const myStack = new Stack<string>();

        myStack.push('One');
        myStack.push('Two');
        myStack.push('Three');

        myStack.clear();

        expect(myStack.count).toBe(0);
        expect(myStack.toArray()).toStrictEqual([]);
    });

    it('should copy values to array', () => {
        const myStack = new Stack<string>();

        myStack.push('One');
        myStack.push('Two');
        myStack.push('Three');

        const array: string[] = [];

        myStack.copyTo(array);

        expect(array).toStrictEqual(['Three', 'Two', 'One']);
    });
});
