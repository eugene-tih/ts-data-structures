export interface IQueue<T> {
    count: number; // Gets the number of elements contained in the IQueue<T>.
    clear(): void; // Removes all nodes from the IQueue<T>.

    contains(value: T): boolean; // Determines whether a value is in the IQueue<T>.

    copyTo(array: T[], index: number): void; // Copies the entire IQueue<T> to a compatible one-dimensional array, starting at the specified index of the target array.

    dequeue(): T; // Removes and returns the object at the beginning of the IQueue<T>
    enqueue(value: T): void; // Adds an object to the end of the IQueue<T>
    peek(): T; // Returns the object at the beginning of the IQueue<T> without removing it
    toArray(): T[]; // Copies the IQueue<T> elements to a new array.
}
