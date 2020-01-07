import {Queue} from './Queue';

describe('Queue', () => {
    it('should create empty Queue structure with default property values', () => {
        const queue = new Queue<string>();

        expect(queue.count).toBe(0);
    });
});
