export const deepCopy = <T extends object>(array: T[]): T[] => {
    return array.map(x => Object.create(x) as T);
}

export const arrayRange = (start: number, end: number, step: number = 1): number[] => {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({ length }, (_, k) => start + k * step);
}

export const findLast = <T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined => {
    let l = array.length;

    while (l--)
        if (predicate(array[l], l, array))
            return array[l];

    return undefined;
}
