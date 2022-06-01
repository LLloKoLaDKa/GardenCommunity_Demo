import { Option } from "../shared/myinputs/selectBox/option";

export const enumToOptions = <T extends string | number>(enumType: any, mapper: (value: T) => string): Option<T>[] => {
    const options: Option<T>[] = [];

    for (var n in enumType) {
        const value = enumType[n];
        if (typeof value !== 'number') continue;

        options.push({ label: mapper(<any>value), value: <any>value });
    }

    return options;
}