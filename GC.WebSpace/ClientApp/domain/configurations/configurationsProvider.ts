import HttpClient from "../../tools/httpClient";
import { ConfigurationLinks } from "../../tools/links";
import { PagedResult } from "../../tools/pagedResult";
import { mapToResult, Result } from "../../tools/result";
import { ConfigurationItem, toModel } from "./configurationItem";
import { ConfigurationItemBlank } from "./configurationItemBlank";

export class ConfigurationsProvider {
    public static async saveConfiguration(configurationItemBlank: ConfigurationItemBlank): Promise<Result<null>> {
        const result = await HttpClient.postAsync(ConfigurationLinks.save, configurationItemBlank);

        return mapToResult(result);
    }

    public static async getConfigurationsPaged(page: number, count: number): Promise<PagedResult<ConfigurationItem>> {
        const result = await HttpClient.getAsync(ConfigurationLinks.getPaged, { page, count });

        return new PagedResult((result.values as any[]).map(x => toModel(x)), result.totalRows);
    }

    public static async removeConfiguration(configurationKey: string): Promise<Result<null>> {
        const result = await HttpClient.postAsync(ConfigurationLinks.remove, configurationKey);

        return mapToResult(result);
    }
}