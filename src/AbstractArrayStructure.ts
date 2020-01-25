export abstract class AbstractArrayStructure<T> {
    public count: number;
    protected readonly _array: T[];

    private readonly __errorName: string;

    protected constructor(className: string, size: number = 0) {
        this.__errorName = 'T' + className;

        this.count = 0;
        this._array = new Array(size);
    }

    public compare(valueA: T, valueB: T): number {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }

    public clear(): void {
        this.count = 0;
        this._array.length = 0;
    }

    public contains(value: T): boolean {
        let i: number;
        let len: number;
        const array = this._array;

        for (i = 0, len = this.count; i < len; i += 1) {
            if (this.compare(array[i], value) === 0) {
                return true;
            }
        }

        return false;
    }

    public copyTo(array: T[], index: number): void {
        let i: number;
        let len: number;
        const originArray = this._array;

        if (index === void 0) {
            index = 0;
        }

        for (i = 0, len = this.count; i < len; i += 1, index += 1) {
            array[index] = originArray[i];
        }
    }

    public toArray(): T[] {
        const newArray = [];
        const originArray = this._array;

        let i: number;
        let len: number;
        for (i = 0, len = this.count; i < len; i += 1) {
            newArray[i] = originArray[i];
        }

        return newArray;
    }

    protected _errorCreator(message: string): Error {
        const error = new Error(message);
        error.name = this.__errorName;
        return error;
    }
}
