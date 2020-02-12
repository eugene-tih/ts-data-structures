# Linked List

A linked list is an ordered collection of data elements. A data element can be represented as a node in a linked list. Each node consists of two parts: data & pointer to the next node (and to previous if it doubly linked list)

Unlike arrays, data elements are not stored at contiguous locations. The data elements or nodes are linked using pointers, hence called a linked list.

## Complexity

| Access | Search | Insertion | Deletion |
| ------ | ------ | --------- | -------- |
| O(n)   | O(n)   | O(1)      | O(1)     |

## Example

```javascript
const myLinkedList = new LinkedList();
myLinkedList.addFirst('Hello');
myLinkedList.addLast('World');

myLinkedList.contains('Bark!');
myLinkedList.remove('Hello');

myLinkedList.clear();
```
