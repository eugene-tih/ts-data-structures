export interface IStack<T> {
    count: number; // Gets the number of elements contained in the IStack<T>.
    clear(): void; // Removes all nodes from the IStack<T>.

    contains(value: T): boolean; // Determines whether a value is in the IStack<T>.

    copyTo(array: T[], index: number): void; // Copies the entire IStack<T> to a compatible one-dimensional array, starting at the specified index of the target array.

    peek(): T; // Returns the object at the beginning of the IStack<T> without removing it
    pop(): T; // Removes and returns the object at the top of the IStack<T>.
    push(value: T): void; // Inserts an object at the top of the IStack<T>.
    toArray(): T[]; // Copies the IStack<T> elements to a new array.
}
