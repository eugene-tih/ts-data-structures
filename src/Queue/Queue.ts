import {IQueue} from './IQueue';

class Queue<T> implements IQueue<T> {
    private __array: T[];

    public constructor(size: number) {
        if (size !== void 0) {
            this.__array = new Array(size);
            return;
        }

        this.__array = [];
    }
}
