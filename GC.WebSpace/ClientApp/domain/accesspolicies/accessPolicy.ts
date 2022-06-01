import { Policy } from "./policy";

export enum AccessPolicy {
    AccessPolicies = "AccessPolicies",
    Ads_Catalog = "Ads_Catalog",
    Appeals_List = "Appeals_List",
    Configurations_Catalog = "Configurations_Catalog",
    Contacts_Catalog = "Contacts_Catalog",
    Credits_Catalog = "Credits_Catalog",
    EnoughAuthorization = "EnoughAuthorization",
    Gardeners_Catalog = "Gardeners_Catalog",
    GardenSectors_Catalog = "GardenSectors_Catalog",
    Novelties_Catalog = "Novelties_Catalog",
    Photos_Catalog = "Photos_Catalog",
    SectorSales_Catalog = "SectorSales_Catalog",
    Users_Catalog = "Users_Catalog"
}

export const mapToAccessPolicy = (value: Policy): AccessPolicy => {
    return value.key as AccessPolicy;
}

export const mapToAccessPolicies = (values: Policy[]): AccessPolicy[] => {
    return values.map(mapToAccessPolicy);
}