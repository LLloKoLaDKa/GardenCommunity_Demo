import { GardenSector } from "./gardenSector";

export class GardenSectorBlank {
    constructor(
        public id: string | null,
        public sectorNumber: number | null,
        public electricityNumber: string | null,
        public numberOfAcres: number | null,
        public cadastralNumber: string | null
    ) { }

    static create = (sector: GardenSector): GardenSectorBlank => {
        return new GardenSectorBlank(sector.id, sector.sectorNumber, sector.electricityNumber, sector.numberOfAcres, sector.cadastralNumber);
    }

    static empty = (): GardenSectorBlank => {
        return new GardenSectorBlank(null, null, null, null, null);
    }
}
