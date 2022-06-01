import { Never } from "../../../tools/never";

export enum SectorCreditSort {
    CreditAscending = 1,
    CreditDescending = 2
}

export namespace SectorCreditSort {
    export function getDisplayName(sort: SectorCreditSort): string {
        switch (sort) {
            case SectorCreditSort.CreditAscending: return "Задолженность (по возрастанию)";
            case SectorCreditSort.CreditDescending: return "Задолженность (по убыванию)";
            default: throw new Never(sort);
        }
    }
}