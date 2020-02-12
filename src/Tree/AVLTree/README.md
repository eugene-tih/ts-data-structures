# AVL Tree

AVL tree is widely known as _self-balancing binary search tree_.
It is named after its creator (Georgy Adelson-Velsky and Landis’ tree).
In AVL Tree, the heights of child subtrees at any node differ by at most 1.
At anytime if height difference becomes greater than 1 then tree balancing is done to restore its property.

## Complexity

| Access    | Search    | Insertion | Deletion  |
| --------- | --------- | --------- | --------- |
| O(log(n)) | O(log(n)) | O(log(n)) | O(log(n)) |

## Example

```javascript
const myAVLTree = new AVLTree();
myAVLTree.insert('Hello');
myAVLTree.insert('World');

myAVLTree.search('Bark!');
myAVLTree.remove('Hello');

myAVLTree.traverseInOrder();
```
