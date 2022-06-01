
export class GardenSector {
    constructor(
        public readonly id: string,
        public readonly sectorNumber: number,
        public readonly electricityNumber: string,
        public readonly numberOfAcres: number,
        public readonly cadastralNumber: string
    ) { }
}

export namespace GardenSector {
    export function toModel(value: any) {
        return new GardenSector(value.id, value.sectorNumber, value.electricityNumber, value.numberOfAcres, value.cadastralNumber);
    }

    export function toModels(values: any[]) {
        return values.map(toModel);
    }
}