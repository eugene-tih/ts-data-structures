# TypeScript Data Structures

This repository contains TypeScript based examples of many
popular data structures. The majority of data structures based on .NET data structure interfaces.

Each structure is fully independent from another ones, has its own short README with some information.
Build was tested on Mac, but probably will work on Linux and Windows.

## List of structures

-   [Linked List (Double)](src/LinkedList)
-   [Queue](src/Queue)
-   [Stack](src/Stack)
-   [Priority Queue](src/PriorityQueue)
-   [Dictionary (HashMap)](src/Dictionary)
-   [Heap](src/Heap)
-   Tree
    -   [Binary Tree](src/Tree/BinaryTree)
    -   [Binary Search Tree](src/Tree/BinarySearchTree)
    -   Red-Black Tree (under development)
    -   [AVL Tree](src/Tree/AVLTree)
-   Bloom Filter (under development)

## How to use this repository

Just to try to work with Data Structures:

-   Open `index.html` file
-   Open browser console
-   Choose one of preferable DS and play with it

Run these commands only if you want to change something:

**Install all dependencies**

```
npm install
```

**Make build**

```
npm run build
```

**Run tests**

```
npm run test
```

## Sources

-   https://adrianmejia.com
-   https://medium.com/edureka
-   https://codeburst.io
-   https://algorithms.tutorialhorizon.com
-   https://referencesource.microsoft.com
-   https://blog.markvincze.com/

## TODO

-   Make all structures iterable using native JS iterator
-   Add to IBinaryTreeNodeCommon parents
-   Rewrite Rollup config (get rid off Main.ts file)
-   Finish develop build
