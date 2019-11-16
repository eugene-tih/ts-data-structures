import {LinkedList} from './LinkedList';
import {LinkedListNode} from './LinkedListNode';
import {ILinkedListNode} from './ILinkedListNode';

describe('LinkedList', () => {
    it('should create LinkedList structure with default property values', () => {
        const linkedList = new LinkedList<string>();

        expect(linkedList.first).toBeNull();
        expect(linkedList.last).toBeNull();
        expect(linkedList.count).toBe(0);
    });

    it('should add LinkedListNode after another LinkedListNode', () => {
        // const linkedList = new LinkedList();
        // const linkedListItem = new LinkedListNode('Hello');
        // linkedList.addAfter(linkedListItem, 'q')
        // linkedList
    });

    describe('Tests connected to inserting into beginning', () => {

        it('should add LinkedListNode as first node into empty LinkedList', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNode = new LinkedListNode('Hello');

            linkedList.addFirst(linkedListNode);

            expect(linkedList.first).toBe(linkedListNode);
            expect(linkedList.last).toBe(linkedListNode);
            expect(linkedList.count).toBe(1);
        });

        it('should add LinkedListNode as first node into non-empty LinkedList', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNode = new LinkedListNode('Hello');
            const linkedListNodeThatShouldBeFirst = new LinkedListNode('World');

            linkedList.addFirst(linkedListNode);
            linkedList.addFirst(linkedListNodeThatShouldBeFirst);

            expect(linkedList.first).toBe(linkedListNodeThatShouldBeFirst);
            expect(linkedList.last).toBe(linkedListNode);
            expect(linkedList.count).toBe(2);

            expect((linkedList.last as ILinkedListNode<string>).previous).toBe(linkedList.first);
        });

        it('should add value as first node into empty LinkedList', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addFirst('Hello');

            expect((linkedList.first as ILinkedListNode<string>).value).toBe('Hello');
            expect((linkedList.last as ILinkedListNode<string>).value).toBe('Hello');
            expect(linkedList.count).toBe(1);
        });

        it('should add value as first node into non-empty LinkedList', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addFirst('Hello');
            linkedList.addFirst('World');

            expect((linkedList.first as ILinkedListNode<string>).value).toBe('World');
            expect((linkedList.last as ILinkedListNode<string>).value).toBe('Hello');
            expect(linkedList.count).toBe(2);

            expect((linkedList.last as ILinkedListNode<string>).previous).toBe(linkedList.first);
        });

        it('should method return correct value', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNode = new LinkedListNode('Hello');

            const returnValueFromAddedNode = linkedList.addFirst(linkedListNode);
            const returnValueFromAddedValue = linkedList.addFirst('Hello');

            expect(returnValueFromAddedNode).toBeUndefined();
            expect(returnValueFromAddedValue).toBeInstanceOf(LinkedListNode);
            expect(returnValueFromAddedValue.value).toBe('Hello');
        });

        it('should added node has link to LinkedList', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNode = new LinkedListNode('Hello');

            const returnValue = linkedList.addFirst('World');
            linkedList.addFirst(linkedListNode);

            expect(linkedListNode.list).toBe(linkedList);
            expect(returnValue.list).toBe(linkedList);
        });
    });

    describe('Tests connected to inserting into ending', () => {

        it('should add LinkedListNode as last node into empty LinkedList', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNode = new LinkedListNode('Hello');

            linkedList.addLast(linkedListNode);

            expect(linkedList.last).toBe(linkedListNode);
            expect(linkedList.first).toBe(linkedListNode);
            expect(linkedList.count).toBe(1);
        });

        it('should add LinkedListNode as last node into non-empty LinkedList', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNode = new LinkedListNode('Hello');
            const linkedListNodeThatShouldBeLast = new LinkedListNode('World');

            linkedList.addLast(linkedListNode);
            linkedList.addLast(linkedListNodeThatShouldBeLast);

            expect(linkedList.last).toBe(linkedListNodeThatShouldBeLast);
            expect(linkedList.first).toBe(linkedListNode);
            expect(linkedList.count).toBe(2);

            expect((linkedList.first as ILinkedListNode<string>).next).toBe(linkedList.last);
        });

        it('should add value as last node into empty LinkedList', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');

            expect((linkedList.last as ILinkedListNode<string>).value).toBe('Hello');
            expect((linkedList.first as ILinkedListNode<string>).value).toBe('Hello');
            expect(linkedList.count).toBe(1);
        });

        it('should add value as last node into non-empty LinkedList', () => {
            const linkedList = new LinkedList<string>();

            linkedList.addLast('Hello');
            linkedList.addLast('World');

            expect((linkedList.last as ILinkedListNode<string>).value).toBe('World');
            expect((linkedList.first as ILinkedListNode<string>).value).toBe('Hello');
            expect(linkedList.count).toBe(2);

            expect((linkedList.first as ILinkedListNode<string>).next).toBe(linkedList.last);
        });

        it('should method return correct value', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNode = new LinkedListNode('Hello');

            const returnValueFromAddedNode = linkedList.addLast(linkedListNode);
            const returnValueFromAddedValue = linkedList.addLast('Hello');

            expect(returnValueFromAddedNode).toBeUndefined();
            expect(returnValueFromAddedValue).toBeInstanceOf(LinkedListNode);
            expect(returnValueFromAddedValue.value).toBe('Hello');
        });

        it('should added node has link to LinkedList', () => {
            const linkedList = new LinkedList<string>();
            const linkedListNode = new LinkedListNode('Hello');

            const returnValue = linkedList.addLast('World');
            linkedList.addLast(linkedListNode);

            expect(linkedListNode.list).toBe(linkedList);
            expect(returnValue.list).toBe(linkedList);
        });
    });

    describe('Tests connected to clearing', () => {

        it('should clear empty LinkedList and return all properties to default value', () => {
            const linkedList = new LinkedList<string>();

            linkedList.clear();

            expect(linkedList.first).toBeNull();
            expect(linkedList.last).toBeNull();
            expect(linkedList.count).toBe(0);
        });

        it('should clear non-empty LinkedList and return all properties to default value', () => {
            const linkedList = new LinkedList<string>();
            const returnValueA = linkedList.addFirst('Hello');
            const returnValueB = linkedList.addFirst('World');
            const returnValueC = linkedList.addFirst('Again');

            linkedList.clear();

            // expect(returnValueA.next).toBeNull();
            // expect(returnValueB.next).toBeNull();

            expect(linkedList.first).toBeNull();
            expect(linkedList.last).toBeNull();
            expect(linkedList.count).toBe(0);
        });
    });
});
