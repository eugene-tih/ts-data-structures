# Stack

Stacks are an elementary data structure, they are the last item in, the first item out (LIFO).
The last item added into the stack will be the first one taken out of the stack.

## Complexity

| Access | Search | Insertion | Deletion |
| ------ | ------ | --------- | -------- |
| O(n)   | O(n)   | O(1)      | O(1)     |

## Example

```javascript
const myStack = new Stack();
myStack.push('Hello');
myStack.push('World');

myStack.peek();
myStack.pop();

myStack.clear();
```
