## Binary Tree Traversal

There are different ways of traversing a Binary Tree, depending on the order that the nodes are visited: in-order, pre-order, and post-order.

             10
           /    \
          5      30
        /       /  \
       4       15   40
     /
    3

### In-Order Traversal

In-order traversal visit nodes on this order: left, parent, right.

In-order traversal would print out the following values: `3`, `4`, `5`, `10`, `15`, `30`, `40`.
If the tree is a BST, then the nodes will be sorted in ascending order as in our example.

### Post-Order Traversal

Post-order traversal visit nodes on this order: left, right, parent.

Post-order traversal would print out the following values: `3`, `4`, `5`, `15`, `40`, `30`, `10`.

### Pre-Order Traversal

In-order traversal visit nodes on this order: parent, left, right.

Pre-order traversal would print out the following values: `10`, `5`, `4`, `3`, `30`, `15`, `40`.
This order of numbers is the same result that we would get if we run the Depth-First Search (DFS).
