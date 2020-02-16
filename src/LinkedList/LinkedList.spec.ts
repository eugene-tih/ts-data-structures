import {LinkedList} from './LinkedList';
import {LinkedListNode} from './LinkedListNode';
import {ILinkedListNode} from './ILinkedListNode';

describe('LinkedList', () => {
    it('should create empty structure with default property values', () => {
        const linkedList = new LinkedList<string>();

        expect(linkedList.first).toBeNull();
        expect(linkedList.last).toBeNull();
        expect(linkedList.count).toBe(0);
    });

    describe('Tests connected to adding value/node to the beginning', () => {
        it('should add node to the beginning', () => {
            const linkedList = new LinkedList<string>();

            const linkedListNodeSecond = new LinkedListNode('World');
            const linkedListNodeFirst = new LinkedListNode('Hello');

            linkedList.addFirst(linkedListNodeSecond);
            linkedList.addFirst(linkedListNodeFirst);

            expect(linkedList.first).toBe(linkedListNodeFirst);
            expect(linkedList.last).toBe(linkedListNodeSecond);
            expect(linkedList.last!.list).toBe(linkedList);
            expect(linkedList.count).toBe(2);
        });

        it('should add value to the beginning', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addFirst('World');
            linkedList.addFirst('Hello');

            expect(linkedList.first!.value).toBe('Hello');
            expect(linkedList.last!.value).toBe('World');
            expect(linkedList.last!.list).toBe(linkedList);
            expect(linkedList.count).toBe(2);
        });
    });

    describe('Tests connected to adding value/node to the ending', () => {
        it('should add node to the ending', () => {
            const linkedList = new LinkedList<string>();

            const linkedListNodeFirst = new LinkedListNode('Hello');
            const linkedListNodeSecond = new LinkedListNode('World');

            linkedList.addLast(linkedListNodeFirst);
            linkedList.addLast(linkedListNodeSecond);

            expect(linkedList.last).toBe(linkedListNodeSecond);
            expect(linkedList.first).toBe(linkedListNodeFirst);
            expect(linkedList.first!.list).toBe(linkedList);
            expect(linkedList.count).toBe(2);
        });

        it('should add value to the ending', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');
            linkedList.addLast('World');

            expect(linkedList.last!.value).toBe('World');
            expect(linkedList.first!.value).toBe('Hello');
            expect(linkedList.first!.list).toBe(linkedList);
            expect(linkedList.count).toBe(2);
        });
    });

    describe('Tests connected to adding value/node after specific node', () => {
        it('should add node after specific one', () => {
            const linkedList = new LinkedList<string>();

            const linkedListNodeReference = new LinkedListNode('Hello');
            const linkedListNode = new LinkedListNode('World');

            linkedList.addFirst(linkedListNodeReference);
            linkedList.addAfter(linkedListNodeReference, linkedListNode);

            expect(linkedListNodeReference.next).toBe(linkedListNode);

            expect(linkedList.last).toBe(linkedListNode);
            expect(linkedList.last!.list).toBe(linkedList);
            expect(linkedList.count).toBe(2);
        });

        it('should add value after specific node', () => {
            const linkedList = new LinkedList<string>();

            const linkedListNodeReference = new LinkedListNode('Hello');

            linkedList.addFirst(linkedListNodeReference);
            linkedList.addAfter(linkedListNodeReference, 'World');

            expect(linkedListNodeReference.next!.value).toBe('World');

            expect(linkedList.last!.value).toBe('World');
            expect(linkedList.last!.list).toBe(linkedList);
            expect(linkedList.count).toBe(2);
        });
    });

    describe('Tests connected to adding value/node before specific node', () => {
        it('should add node before specific one', () => {
            const linkedList = new LinkedList<string>();

            const linkedListNodeReference = new LinkedListNode('Hello');
            const linkedListNode = new LinkedListNode('World');

            linkedList.addFirst(linkedListNodeReference);
            linkedList.addBefore(linkedListNodeReference, linkedListNode);

            expect(linkedListNodeReference.previous).toBe(linkedListNode);

            expect(linkedList.first).toBe(linkedListNode);
            expect(linkedList.first!.list).toBe(linkedList);
            expect(linkedList.count).toBe(2);
        });

        it('should add value before specific node', () => {
            const linkedList = new LinkedList<string>();

            const linkedListNodeReference = new LinkedListNode('Hello');

            linkedList.addFirst(linkedListNodeReference);
            linkedList.addBefore(linkedListNodeReference, 'World');

            expect(linkedListNodeReference.previous!.value).toBe('World');

            expect(linkedList.first!.value).toBe('World');
            expect(linkedList.first!.list).toBe(linkedList);
            expect(linkedList.count).toBe(2);
        });
    });

    describe('Tests connected to searching', () => {
        it('should find an item', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');
            linkedList.addLast('World');
            linkedList.addLast('John');

            const result = linkedList.find('World') as ILinkedListNode<string>;

            expect(result.value).toBe('World');
        });

        it('should find a last item', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNodeToSearch = new LinkedListNode('World');

            linkedList.addLast('Hello');
            linkedList.addLast('World');
            linkedList.addLast(linkedListNodeToSearch);

            const result = linkedList.findLast('World') as ILinkedListNode<string>;

            expect(result).toBe(linkedListNodeToSearch);
        });

        it('should return `null` if could not find an item', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');

            const result = linkedList.find('World');

            expect(result).toBeNull();
        });

        it('should return `true` if contains value', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');
            linkedList.addLast('World');
            linkedList.addLast('John');

            const result = linkedList.contains('World');

            expect(result).toBe(true);
        });
    });

    describe('Tests connected to removing', () => {
        it('should remove node', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNodeToRemove = new LinkedListNode('World');

            linkedList.addLast('Hello');
            linkedList.addLast(linkedListNodeToRemove);
            linkedList.addLast('John');

            linkedList.remove(linkedListNodeToRemove);

            expect(linkedListNodeToRemove.next).toBeNull();
            expect(linkedListNodeToRemove.previous).toBeNull();
            expect(linkedList.find('World')).toBeNull();
            expect(linkedList.count).toBe(2);
        });

        it('should return `true` if remove value', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');
            linkedList.addLast('World');
            linkedList.addLast('John');

            const response = linkedList.remove('World');

            expect(response).toBe(true);
            expect(linkedList.find('World')).toBeNull();
            expect(linkedList.count).toBe(2);
        });

        it('should return `false` if could not remove value', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');
            linkedList.addLast('World');
            linkedList.addLast('John');

            const response = linkedList.remove('Wayne');

            expect(response).toBe(false);
        });

        it('should remove first node', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');
            linkedList.addLast('World');
            linkedList.addLast('John');

            linkedList.removeFirst();

            expect(linkedList.find('Hello')).toBeNull();
            expect(linkedList.first!.value).toBe('World');
            expect(linkedList.first!.previous).toBeNull();
            expect(linkedList.count).toBe(2);
        });

        it('should remove last node', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');
            linkedList.addLast('World');
            linkedList.addLast('John');

            linkedList.removeLast();

            expect(linkedList.find('John')).toBeNull();
            expect(linkedList.last!.value).toBe('World');
            expect(linkedList.last!.next).toBeNull();
            expect(linkedList.count).toBe(2);
        });
    });

    it('should clear structure', () => {
        const linkedList = new LinkedList<string>();

        linkedList.addLast('Hello');
        linkedList.addLast('World');
        linkedList.addLast('John');
        linkedList.clear();

        expect(linkedList.count).toBe(0);
        expect(linkedList.first).toBeNull();
        expect(linkedList.last).toBeNull();
        expect(linkedList.find('World')).toBeNull();
    });

    it('should copy values to array', () => {
        const linkedList = new LinkedList<string>();

        linkedList.addLast('Hello');
        linkedList.addLast('World');
        linkedList.addLast('John');

        const array: string[] = [];

        linkedList.copyTo(array);

        expect(array).toEqual(['Hello', 'World', 'John']);
    });
});
