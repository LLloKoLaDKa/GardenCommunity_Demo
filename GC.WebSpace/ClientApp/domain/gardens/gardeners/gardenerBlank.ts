import { Gardener } from "./gardener";

export class GardenerBlank {
    constructor(
        public id: string | null,
        public firstName: string,
        public middleName: string | null,
        public lastName: string,
        public sectorId: string | null
    ) { }

    static create = (gardener: Gardener): GardenerBlank => {
        return new GardenerBlank(gardener.id, gardener.firstName, gardener.middleName, gardener.lastName, gardener.sectorId);
    }

    static empty = (): GardenerBlank => {
        return new GardenerBlank(null, '', '', '', null);
    }
}