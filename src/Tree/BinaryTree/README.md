#Binary Tree

A binary tree is a recursive tree data structure where each node can have 2 children at most.

Each data element stored in a tree structure called a node. A Tree node contains the following parts:
 - Data
 - Pointer to left child
 - Pointer to right child
 
Depending on how nodes are arranged in a binary tree, it can be **full**, **complete** and **perfect**:
 - **Full binary tree**: each node has exactly 0 or 2 children (but never 1).
 - **Complete binary tree**: when all levels except the last one are full with nodes.
 - **Perfect binary tree**: when all the levels (including the last one) are full of nodes.

## Complexity

| Access    | Search    | Insertion | Deletion  |
| -------   | -------   | -------   | -------   |
| O(n)      | O(n)      | O(n)      | O(n)      |

## Example

```javascript
const myLinkedList = new LinkedList();
myLinkedList.addFirst('Hello');
myLinkedList.addLast('World');

myLinkedList.contains('Bark!');
myLinkedList.clear();
```
