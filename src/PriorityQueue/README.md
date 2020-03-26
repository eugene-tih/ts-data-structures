# PriorityQueue

A priority queue is a special type of queue in which each element is associated with a priority and is served according to its priority.
If elements with the same priority occur, they are served according to their order in the queue.

The head of this queue is the least element with respect to the specified ordering.

## Time Complexity

| Access | Search | Insertion | Deletion  |
| ------ | ------ | --------- | --------- |
| O(1)   | O(n)   | O(log(n)) | O(log(n)) |

## Space Complexity

| Worst |
| ----- |
| O(n)  |

## Example

```javascript
const myPriorityQueue = new PriorityQueue();
myPriorityQueue.enqueue('Hello', 1);
myPriorityQueue.enqueue('World', 2);

myPriorityQueue.peek();
myPriorityQueue.dequeue();

myPriorityQueue.clear();
```
