export abstract class AbstractArrayStructure<T> {
    public count = 0;
    protected readonly _array: T[];

    protected constructor(size: number = 0) {
        this._array = new Array(size);
    }

    public compare(valueA: T, valueB: T): number {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }

    public clear(): void {
        this.count = 0;
        this._array.length = 0;
    }

    contains(value: T): boolean {
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

    copyTo(array: T[], index: number): void {
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
}
