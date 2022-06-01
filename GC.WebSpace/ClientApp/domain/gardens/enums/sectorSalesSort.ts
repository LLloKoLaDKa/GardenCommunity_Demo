import { Never } from "../../../tools/never";

export enum SectorSaleSort {
    PriceAscending = 1,
    PriceDescending = 2
}

export namespace SectorSaleSort {
    export function getDisplayName(sort: SectorSaleSort): string {
        switch (sort) {
            case SectorSaleSort.PriceAscending: return "Цена (по возрастанию)";
            case SectorSaleSort.PriceDescending: return "Цена (по убыванию)";
            default: throw new Never(sort);
        }
    }
}