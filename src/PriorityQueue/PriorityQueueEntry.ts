export class PriorityQueueEntry<T> {
    public priorityIndex: number;
    public arrayElementLink: T;

    public constructor(priorityIndex: number, arrayElementLink: T) {
        this.priorityIndex = priorityIndex;
        this.arrayElementLink = arrayElementLink;
    }
}
