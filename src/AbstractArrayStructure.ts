export abstract class AbstractArrayStructure<T> {
    protected readonly _array: T[];

    protected readonly _className: string;

    protected constructor(className: string, size: number = 0) {
        this._className = className;
        this._array = new Array(size);
    }

    get count(): number {
        return this._array.length;
    }

    public compare(valueA: T, valueB: T): number {
        return valueA === valueB ? 0 : valueA < valueB ? -1 : 1;
    }

    public clear(): void {
        this._array.length = 0;
    }

    public contains(value: T): boolean {
        return this._find(value) > -1;
    }

    public copyTo(array: T[], index: number = 0): void {
        let i: number;
        let len: number;
        const originArray = this._array;

        for (i = 0, len = originArray.length; i < len; i += 1, index += 1) {
            array[index] = originArray[i];
        }
    }

    public toArray(): T[] {
        const newArray = [];
        const originArray = this._array;

        let i: number;
        let len: number;
        for (i = 0, len = originArray.length; i < len; i += 1) {
            newArray[i] = originArray[i];
        }

        return newArray;
    }

    protected _find(value: T): number {
        const compare = this.compare;
        const array = this._array;

        let i: number;
        let len: number;

        for (i = 0, len = array.length; i < len; i += 1) {
            if (compare(array[i], value) === 0) {
                return i;
            }
        }

        return -1;
    }

    protected _errorCreator(message: string): Error {
        const error = new Error(message);
        error.name = 'T' + this._className;

        return error;
    }
}
