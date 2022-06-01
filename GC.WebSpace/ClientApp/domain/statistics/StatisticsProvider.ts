import HttpClient from "../../tools/httpClient";
import { StatisticsLinks } from "../../tools/links";
import { PageEntry } from "./pageEntries/pageEntry";

export namespace StatisticsProvider {
    export namespace PageEntries {
        export async function getPageEntries(startDate: Date | null, endDate: Date | null): Promise<PageEntry[]> {
            const response = await HttpClient.getAsync(StatisticsLinks.getPageEntries, { startDate, endDate });
            return PageEntry.toModels(response as any[]);
        }
    }
}