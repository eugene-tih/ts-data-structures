# Heap

A heap (binary) is a tree-based data structure in which all the nodes of the tree are in a specific order.

There can be two types of heap:

-   _Max Heap:_ In this type of heap, the value of parent node will always be greater than or equal to
    the value of child node across the tree and the node with highest value will be the root node of the tree.
-   _Min Heap:_ In this type of heap, the value of parent node will always be less than or equal to the value
    of child node across the tree and the node with lowest value will be the root node of tree.

## Complexity

| Access | Search | Insertion | Deletion  |
| ------ | ------ | --------- | --------- |
| O(n)   | O(n)   | O(log(n)) | O(log(n)) |

## Example

```javascript
const myHeap = new Heap();
myHeap.insert(7);
myHeap.insert(10);
myHeap.insert(2);

myHeap.contains(1000);
myHeap.remove(10);

myHeap.clear();
```
