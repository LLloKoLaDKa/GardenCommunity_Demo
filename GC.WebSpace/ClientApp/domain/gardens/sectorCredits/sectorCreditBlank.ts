import { SectorCredit } from "./sectorCredit";

export class SectorCreditBlank {
    constructor(
        public id: string,
        public sectorId: string,
        public credit: number | null
    ) { }

    public static create(credit: SectorCredit) {
        return new SectorCreditBlank(credit.id, credit.sector.id, credit.credit);
    }
}