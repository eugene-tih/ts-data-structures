# Binary Search Tree

Binary Search Trees or BST for short are a particular application of binary trees.
BST has at most two nodes (like all binary trees). However, the values are in such a way
that the left children value must be less than the parent, and the right children is
must be higher.

**Duplicates**: Some BST doesn’t allow duplicates while others add the same values as a
right child. Other implementations might keep a count on a case of the duplicity. Current realization
does not allow duplicates.

## Complexity

| Space | Search | Insertion | Deletion |
| ----- | ------ | --------- | -------- |
| O(n)  | O(n)   | O(n)      | O(n)     |

## Example

```javascript
const myBinarySearchTree = new BinarySearchTree();
myBinarySearchTree.insert('Hello');
myBinarySearchTree.insert('World');

myBinarySearchTree.search('Bark!');
myBinarySearchTree.remove('Hello');

myBinarySearchTree.traverseInOrder();
```
