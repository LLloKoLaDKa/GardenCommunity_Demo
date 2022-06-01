import { GardenSector } from "../gardenSectors/gardenSector";

export class SectorSale {
    constructor(
        public readonly id: string,
        public readonly sector: GardenSector,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly middleName: string | null,
        public readonly description: string | null,
        public readonly price: number,
        public readonly phoneNumber: string,
        public readonly publishDate: Date,
    ) { }

    public get fullName(): string {
        return `${this.lastName} ${this.firstName} ${this.middleName == null ? '' : ` ${this.middleName}`}`;
    }
}

export namespace SectorSale {
    export function toModel(data: any) {
        return new SectorSale(data.id, GardenSector.toModel(data.sector), data.firstName, data.lastName, data.middleName, data.description,
            Number(data.price), data.phoneNumber, new Date(data.publishDate));
    }

    export function toModels(data: any[]) {
        return data.map(toModel);
    }
}