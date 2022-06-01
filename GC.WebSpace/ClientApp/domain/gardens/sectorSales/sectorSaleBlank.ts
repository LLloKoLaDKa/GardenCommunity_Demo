import { SectorSale } from "./sectorSale";

export class SectorSaleBlank {
    constructor(
        public id: string | null,
        public sectorId: string,
        public firstName: string,
        public lastName: string,
        public middleName: string | null,
        public description: string | null,
        public price: number | null,
        public phoneNumber: string
    ) { }

    public static empty = () => {
        return new SectorSaleBlank(null, "", "", "", null, null, null, "");
    }

    public static create = (sale: SectorSale) => {
        return new SectorSaleBlank(sale.id, sale.sector.id, sale.firstName, sale.lastName, sale.middleName, sale.description,
            sale.price, sale.phoneNumber);
    }
}