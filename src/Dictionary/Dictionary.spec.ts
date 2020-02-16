import {Dictionary} from './Dictionary';


describe('Dictionary', () => {
    it('should create empty structure with default property values', () => {
        const myDictionary = new Dictionary<string, string>();

        expect(myDictionary.count).toBe(0);
        expect(myDictionary.keys).toStrictEqual([]);
        expect(myDictionary.values).toStrictEqual([]);
    });

    describe('Tests connected to adding', () => {
        it('should insert one item', () => {
            const myDictionary = new Dictionary<string, string>();

            myDictionary.add('1', 'Hello');

            expect(myDictionary.count).toBe(1);
            expect(myDictionary.get('1')).toBe('Hello');
        });

        it('should insert bunch of items', () => {
            const myDictionary = new Dictionary<string, string>();

            myDictionary
                .add('1', 'Hello')
                .add('2', 'World')
                .add('3', 'John')
                .add('4', 'Wayne');

            expect(myDictionary.count).toBe(4);
            expect(myDictionary.get('1')).toBe('Hello');
            expect(myDictionary.get('2')).toBe('World');
            expect(myDictionary.get('3')).toBe('John');
            expect(myDictionary.get('4')).toBe('Wayne');
        });
    });

    describe('Tests connected to containing', () => {});

    describe('Tests connected to removing', () => {
        it('should remove item and return `true`', () => {
            const myDictionary = new Dictionary<string, string>();

            myDictionary.add('1', 'Hello');

            const result = myDictionary.remove('1');

            expect(result).toBe(true);
            expect(myDictionary.count).toBe(0);
            expect(myDictionary.get('1')).toBeNull();
        });

        it('should remove two items and return `true`', () => {
            const myDictionary = new Dictionary<string, string>();

            myDictionary
                .add('1', 'Hello')
                .add('2', 'World')
                .add('3', 'John')
                .add('4', 'Wayne');

            const result1 = myDictionary.remove('1');
            const result2 = myDictionary.remove('4');

            expect(result1).toBe(true);
            expect(result2).toBe(true);
            expect(myDictionary.count).toBe(2);
            expect(myDictionary.get('1')).toBeNull();
            expect(myDictionary.get('4')).toBeNull();
        });

        it('should return `false` if could not remove value', () => {
            const myDictionary = new Dictionary<string, string>();

            myDictionary
                .add('1', 'Hello')
                .add('2', 'World')
                .add('3', 'John')
                .add('4', 'Wayne');

            const result = myDictionary.remove('5');

            expect(result).toBe(false);
            expect(myDictionary.count).toBe(4);
        });
    });

    it('should clear structure', () => {});
});
