import HttpClient from "../../tools/httpClient";
import { AdLinks, NoveltyLinks } from "../../tools/links";
import { PagedResult } from "../../tools/pagedResult";
import { mapToResult, Result } from "../../tools/result";
import { Ad } from "./ads/ad";
import { AdBlank } from "./ads/adBlank";
import { AdType } from "./ads/adType";
import { Novelty } from "./novelties/novelty";
import { NoveltyBlank } from "./novelties/noveltyBlank";

export namespace RecordsProvider {
    export namespace ads {
        export async function save(adBlank: AdBlank): Promise<Result<string>> {
            const result = await HttpClient.postAsync(AdLinks.save, adBlank);
            return mapToResult(result)
        }

        export async function getPaged(page: number, pageSize: number, adType: AdType | null, search: string): Promise<PagedResult<Ad>> {
            const result = await HttpClient.getAsync(AdLinks.getPaged, { page, pageSize, adType, search });
            return new PagedResult(Ad.toModels(result.values as any[]), result.totalRows)
        }

        export async function getOffereds(): Promise<Ad[]> {
            const ads = await HttpClient.getAsync(AdLinks.getOffered);
            return Ad.toModels(ads);
        }

        export async function getOfferedsCount(): Promise<number> {
            const number = await HttpClient.getAsync(AdLinks.getOfferedCount);
            return Number(number)
        }

        export async function getArchives(): Promise<Ad[]> {
            const ads = await HttpClient.getAsync(AdLinks.getArchived);
            return Ad.toModels(ads);
        }

        export async function takeOff(adId: string): Promise<Result<string>> {
            const result = await HttpClient.postAsync(AdLinks.takeOff, adId);
            return mapToResult(result);
        }

        export async function publish(adBlank: AdBlank): Promise<Result<string>> {
            const result = await HttpClient.postAsync(AdLinks.publish, adBlank);
            return mapToResult(result);
        }

        export async function remove(adId: string): Promise<Result<string>> {
            const result = await HttpClient.postAsync(AdLinks.remove, adId);
            return mapToResult(result)
        }
    }

    export namespace Novelties {
        export async function save(noveltyBlank: NoveltyBlank): Promise<Result<string | null>> {
            const result = await HttpClient.postAsync(NoveltyLinks.save, noveltyBlank);
            return mapToResult(result);
        }

        export async function getPaged(page: number, pageSize: number, search: string): Promise<PagedResult<Novelty>> {
            const result = await HttpClient.getAsync(NoveltyLinks.getPaged, { page, pageSize, search });
            return new PagedResult(Novelty.toModels(result.values as any[]), result.totalRows);
        }

        export async function getArchives(): Promise<Novelty[]> {
            const novelties = await HttpClient.getAsync(NoveltyLinks.getArchived);
            return Novelty.toModels(novelties);
        }

        export async function takeOff(noveltyId: string): Promise<Result<string | null>> {
            const result = await HttpClient.postAsync(NoveltyLinks.takeOff, noveltyId);
            return mapToResult(result);
        }

        export async function publish(noveltyBlank: NoveltyBlank): Promise<Result<string | null>> {
            const result = await HttpClient.postAsync(NoveltyLinks.publish, noveltyBlank);
            return mapToResult(result);
        }

        export async function remove(noveltyId: string): Promise<Result<string | null>> {
            const result = await HttpClient.getAsync(NoveltyLinks.remove, { noveltyId });
            return mapToResult(result);
        }
    }
}