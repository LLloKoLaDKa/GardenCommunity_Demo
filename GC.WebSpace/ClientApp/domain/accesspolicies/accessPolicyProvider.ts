import { HttpClient } from "../../tools/httpClient";
import { AccessPolicyLinks } from "../../tools/links";
import { mapToPolicies, Policy } from "./policy";

export class AccessPolicyProvider {
    public static async getAccessPolicies(): Promise<Policy[]> {
        const result = await HttpClient.getAsync(AccessPolicyLinks.getAccessPolicies);
        return mapToPolicies(result)
    }

    public static async getAccessPoliciesByUserAccessRole(roleId: string): Promise<Policy[]> {
        const result = await HttpClient.getAsync(AccessPolicyLinks.getByRoleId, { roleId });
        return mapToPolicies(result)
    }
}