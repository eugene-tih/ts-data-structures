import {Stack} from './Stack';

describe('Stack', () => {
    it('should create empty Stack structure with default property values', () => {
        const queue = new Stack<string>();

        expect(queue.count).toBe(0);
    });
});
