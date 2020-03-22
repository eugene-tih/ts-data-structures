# PriorityQueue

A priority queue is a special type of queue in which each element is associated with a priority and is served according to its priority.
If elements with the same priority occur, they are served according to their order in the queue.

## Complexity

| Access | Search | Insertion | Deletion  |
| ------ | ------ | --------- | --------- |
| O(n)   | O(n)   | O(log(n)) | O(log(n)) |

## Example

```javascript
const myPriorityQueue = new PriorityQueue();
myPriorityQueue.enqueue('Hello', 1);
myPriorityQueue.enqueue('World', 2);

myPriorityQueue.peek();
myPriorityQueue.dequeue();

myPriorityQueue.clear();
```
