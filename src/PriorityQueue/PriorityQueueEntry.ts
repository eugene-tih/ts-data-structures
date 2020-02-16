export class PriorityQueueEntry<T> {
    public value: T;
    public priorityIndex: number;

    public constructor(value: T, priorityIndex: number) {
        this.value = value;
        this.priorityIndex = priorityIndex;
    }
}
