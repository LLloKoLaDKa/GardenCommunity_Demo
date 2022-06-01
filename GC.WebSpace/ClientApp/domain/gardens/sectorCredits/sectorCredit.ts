import { Gardener } from "../gardeners/gardener";
import { GardenSector } from "../gardenSectors/gardenSector";

export class SectorCredit {
    constructor(
        public readonly id: string,
        public readonly gardener: Gardener,
        public readonly sector: GardenSector,
        public readonly credit: number
    ) { }
}

export namespace SectorCredit {
    export function toModel(data: any): SectorCredit {
        return new SectorCredit(data.id, Gardener.toModel(data.gardener), GardenSector.toModel(data.sector), Number(data.credit));
    }

    export function toModels(data: any[]): SectorCredit[] {
        return data.map(toModel);
    }
}