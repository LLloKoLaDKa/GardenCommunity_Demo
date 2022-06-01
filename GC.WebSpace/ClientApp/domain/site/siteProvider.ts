import HttpClient from "../../tools/httpClient";
import { SiteLinks } from "../../tools/links";
import { PagedResult } from "../../tools/pagedResult";
import { mapToResult, Result } from "../../tools/result";
import { AllContacts } from "../contacts/allContacts";
import { AppealBlank } from "../gardens/appeals/appealBlank";
import { SectorSaleSort } from "../gardens/enums/sectorSalesSort";
import { GardenSector } from "../gardens/gardenSectors/gardenSector";
import { GardenStreet } from "../gardens/gardenStreet";
import { Photo } from "../gardens/photos/photo";
import { SectorCredit } from "../gardens/sectorCredits/sectorCredit";
import { SectorSale } from "../gardens/sectorSales/sectorSale";
import { Ad } from "../records/ads/ad";
import { AdBlank } from "../records/ads/adBlank";
import { Novelty } from "../records/novelties/novelty";
import { PageEntryBlank } from "../statistics/pageEntries/pageEntryBlank";
import { GardenSettings } from "./models/gardenSettings";

export namespace SiteProvider {
    export namespace Novelties {
        export async function getThreeLastNovelties(): Promise<Novelty[]> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Novelties.getLastNovelties);
            return Novelty.toModels(response);
        }

        export async function getById(noveltyId: string): Promise<Novelty> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Novelties.getNoveltyById, { noveltyId });
            return Novelty.toModel(response);
        }

        export async function getPaged(page: number, pageSize: number): Promise<PagedResult<Novelty>> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Novelties.getPaged, { page, pageSize });
            return new PagedResult<Novelty>(Novelty.toModels(response.values), response.totalRows);
        }
    }

    export namespace Ads {
        export async function saveOffered(adBlank: AdBlank): Promise<Result<string | null>> {
            const response = await HttpClient.postAsync(SiteLinks.Provider.Ads.saveOffered, adBlank);
            return mapToResult(response);
        }

        export async function getLast(): Promise<Ad> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Ads.getLast);
            return Ad.toModel(response);
        }

        export async function getById(adId: string): Promise<Ad> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Ads.getById, { adId });
            return Ad.toModel(response);
        }

        export async function getPaged(page: number, pageSize: number): Promise<PagedResult<Ad>> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Ads.getPaged, { page, pageSize });
            return new PagedResult<Ad>(Ad.toModels(response.values), response.totalRows);
        }
    }

    export namespace Contacts {
        export async function getAllContacts(): Promise<AllContacts> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Contacts.getAll);
            return AllContacts.toModel(response);
        }
    }

    export namespace Appeals {
        export async function saveAppeal(appealBlank: AppealBlank): Promise<Result<string | null>> {
            const response = await HttpClient.postAsync(SiteLinks.Provider.Appeals.save, appealBlank);
            return mapToResult(response);
        }
    }

    export namespace Sectors {
        export async function getByIds(ids: string[]): Promise<GardenSector[]> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Sectors.getByIds, { ids });
            return GardenSector.toModels(response);
        }
    }

    export namespace SectorSales {
        export async function GetPaged(page: number, count: number, street: GardenStreet | null, sort: SectorSaleSort | null): Promise<PagedResult<SectorSale>> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.SectorSales.getPaged, { page, count, street, sort });
            const sales = SectorSale.toModels(response.values as any[]);

            return new PagedResult(sales, response.totalRows);
        }
    }

    export namespace Information {
        export async function getContributions(): Promise<GardenSettings> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Information.getGardenSettings);
            return GardenSettings.toModel(response);
        }
    }

    export namespace Gallery {
        export async function getAll(): Promise<Photo[]> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Gallery.getAll);
            return Photo.toModels(response as any[]);
        }
    }

    export namespace Credits {
        export async function getNonZero(): Promise<SectorCredit[]> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Credits.getNonZero);
            return SectorCredit.toModels(response as any[]);
        }

        export async function getLastModifiedDateTime(): Promise<Date> {
            const response = await HttpClient.getAsync(SiteLinks.Provider.Credits.getLastModifiedDateTime);
            return new Date(response);
        }
    }

    export namespace Statistics {
        export async function savePageEntry(entryBlank: PageEntryBlank) {
            await HttpClient.postAsync(SiteLinks.Provider.Statistics.savePageEntry, entryBlank);
        }
    }
}