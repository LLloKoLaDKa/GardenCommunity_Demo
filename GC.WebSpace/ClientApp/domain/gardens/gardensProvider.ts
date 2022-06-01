import HttpClient from "../../tools/httpClient"
import { AppealLinks, GardenerLinks, GardenSectorLinks, PhotosLinks as PhotoLinks, SectorCreditsLinks, SectorSaleLinks } from "../../tools/links"
import { PagedResult } from "../../tools/pagedResult"
import { mapToResult, Result } from "../../tools/result"
import { Appeal, mapToAppeals } from "./appeals/appeal"
import { SectorCreditSort } from "./enums/sectorCreditSort"
import { SectorSaleSort } from "./enums/sectorSalesSort"
import { Gardener } from "./gardeners/gardener"
import { GardenerBlank } from "./gardeners/gardenerBlank"
import { GardenSector } from "./gardenSectors/gardenSector"
import { GardenSectorBlank } from "./gardenSectors/gardenSectorBlank"
import { GardenStreet } from "./gardenStreet"
import { Photo } from "./photos/photo"
import { PhotoBlank } from "./photos/photoBlank"
import { SectorCredit } from "./sectorCredits/sectorCredit"
import { SectorCreditBlank } from "./sectorCredits/sectorCreditBlank"
import { SectorSale } from "./sectorSales/sectorSale"
import { SectorSaleBlank } from "./sectorSales/sectorSaleBlank"

export class GardensProvider {
    static Appeals = class {
        public static getAppealsPaged = async (page: number, pageSize: number, startDate: Date | null,
            endDate: Date | null, search: string): Promise<PagedResult<Appeal>> => {
            const response = await HttpClient.getAsync(AppealLinks.getPaged, { page, pageSize, startDate, endDate, search });

            return new PagedResult(mapToAppeals(response.values as any[]), response.totalRows);
        }

        public static setViewed = (appealId: string): void => {
            HttpClient.postAsync(AppealLinks.setViewed, appealId);
        }
    }

    static Gardeners = class {
        public static saveGardener = async (gardenerBlank: GardenerBlank): Promise<Result<string>> => {
            const response = await HttpClient.postAsync(GardenerLinks.save, gardenerBlank);
            return mapToResult(response);
        }

        public static getAll = async (): Promise<Gardener[]> => {
            const gardeners = await HttpClient.getAsync(GardenerLinks.getAll);
            return Gardener.toModels(gardeners);
        }

        public static getGardenersPaged = async (page: number, count: number, search: string): Promise<PagedResult<Gardener>> => {
            const response = await HttpClient.getAsync(GardenerLinks.getPaged, { page, count, search });
            const gardenersPaged = Gardener.toModels(response.values as any[]);

            return new PagedResult(gardenersPaged, response.totalRows);
        }

        public static removeGardener = async (gardenerId: string): Promise<Result<string>> => {
            const response = await HttpClient.postAsync(GardenerLinks.remove, gardenerId);
            return mapToResult(response);
        }
    }

    static GardenSectors = class {
        public static saveGardenSector = async (sectorBlank: GardenSectorBlank): Promise<Result<string>> => {
            const response = await HttpClient.postAsync(GardenSectorLinks.save, sectorBlank);
            return mapToResult(response);
        }

        public static getAll = async (): Promise<GardenSector[]> => {
            const sectors = await HttpClient.getAsync(GardenSectorLinks.getAll);
            return GardenSector.toModels(sectors);
        }

        public static getGardenSectorsPaged = async (page: number, count: number, street: GardenStreet | null, sectorNumber: number | null): Promise<PagedResult<GardenSector>> => {
            const response = await HttpClient.getAsync(GardenSectorLinks.getPaged, { page, count, street, sectorNumber });
            const gardenSectorsPaged = GardenSector.toModels(response.values as any[]);

            return new PagedResult(gardenSectorsPaged, response.totalRows);
        }

        public static removeGardenSector = async (sectorId: string): Promise<Result<string>> => {
            const response = await HttpClient.postAsync(GardenSectorLinks.remove, sectorId);
            return mapToResult(response);
        }
    }

    static SectorSales = class {
        public static saveSale = async (blank: SectorSaleBlank): Promise<Result<string>> => {
            const response = await HttpClient.postAsync(SectorSaleLinks.save, blank);
            return mapToResult(response);
        }

        public static getSectorSalesPaged = async (page: number, count: number, street: GardenStreet | null, sort: SectorSaleSort | null): Promise<PagedResult<SectorSale>> => {
            const response = await HttpClient.getAsync(SectorSaleLinks.getPaged, { page, count, street, sort });
            const sales = SectorSale.toModels(response.values as any[]);

            return new PagedResult(sales, response.totalRows);
        }

        public static removeSale = async (saleId: string): Promise<Result<string>> => {
            const response = await HttpClient.postAsync(SectorSaleLinks.remove, saleId);
            return mapToResult(response);
        }

    }

    static Photos = class {
        public static savePhoto = async (photo: PhotoBlank): Promise<Result<string | null>> => {
            const response = await HttpClient.postAsync(PhotoLinks.save, photo);
            return mapToResult(response);
        }

        public static getAllPhotos = async (): Promise<Photo[]> => {
            const response = await HttpClient.getAsync(PhotoLinks.getAll);
            return Photo.toModels(response as any[]);
        }

        public static delete = async (photo: Photo): Promise<Result<string | null>> => {
            const response = await HttpClient.postAsync(PhotoLinks.delete, photo);
            return mapToResult(response);
        }
    }

    static Credits = class {
        public static saveCredit = async (creditBlank: SectorCreditBlank): Promise<Result<string | null>> => {
            const response = await HttpClient.postAsync(SectorCreditsLinks.save, creditBlank);
            return mapToResult(response);
        }

        public static tryRenderReport = async (): Promise<Result<null>> => {
            const response = await HttpClient.postAsync(SectorCreditsLinks.tryRenderReport, null);
            return mapToResult(response);
        }

        public static getPaged = async (page: number, count: number, sectorNumber: number | null, sort: SectorCreditSort | null) => {
            const response = await HttpClient.getAsync(SectorCreditsLinks.getPaged, { page, count, sectorNumber, sort });
            const credits = SectorCredit.toModels(response.values as any[])

            return new PagedResult(credits, response.totalRows);
        }
    }
}