import { Never } from "../../../tools/never";

export enum AdType {
    SelfWritten = 1,
    Offered = 2
}

export namespace AdType {
    export function getDisplayName(type: AdType) {
        switch (type) {
            case AdType.SelfWritten: return 'Самописное';
            case AdType.Offered: return 'Предложенное';
            default: throw new Never(type);
        }
    }

    export function getAll(): AdType[] {
        return Object.keys(AdType)
            .filter(v => isNaN(Number(v)) === false)
            .map(key => Number(key) as AdType);
    }
}