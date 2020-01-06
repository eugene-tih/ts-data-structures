export interface IComparer<T, U> {
    compare(valueA: T, valueB: U): number; // Exposes a method that compares two objects.
}
