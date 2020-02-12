# Queue

A queue is a simple data structure that allows elements to be inserted from one end,
called the rear (also called tail), and deleted from the other end, called the front (also called head).

This behavior is called FIFO (First in First Out).

## Complexity

| Access | Search | Insertion | Deletion |
| ------ | ------ | --------- | -------- |
| O(n)   | O(n)   | O(1)      | O(1)     |

## Example

```javascript
const myQueue = new Queue();
myQueue.enqueue('Hello');
myQueue.enqueue('World');

myQueue.peek();
myQueue.dequeue();

myQueue.clear();
```
