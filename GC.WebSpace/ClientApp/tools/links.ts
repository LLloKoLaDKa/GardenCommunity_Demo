export class SiteLinks {
    static homePage = '/';
    static newsPage = '/News';
    static newsByIdPage = '/News/:noveltyId?';
    static adsPage = '/Ads';
    static adByIdPage = '/Ads/:adId?';
    static contactsPage = '/Contacts';
    static information = '/Information';
    static sectorSales = '/SectorSales';
    static credits = '/Credits';
    static gallery = '/Gallery';

    static Provider = class {
        static Novelties = class {
            static getPaged = "/Novelties/GetPaged"
            static getLastNovelties = "/Novelties/GetThreeLast"
            static getNoveltyById = "/Novelties/GetById"
        }

        static Ads = class {
            static saveOffered = "/Ads/SaveOffered";
            static getLast = "/Ads/GetLast";
            static getById = "/Ads/GetById";
            static getPaged = "/Ads/GetPaged";
        }

        static Contacts = class {
            static getAll = "/Contacts/GetAllContacts"
        }

        static Appeals = class {
            static save = "/Appeals/Save"
        }

        static Sectors = class {
            static getByIds = "/GardenSectors/GetByIds"
        }

        static SectorSales = class {
            static getPaged = "/SectorSales/GetPaged"
        }

        static Information = class {
            static getGardenSettings = "/Information/GetGardenSettings";
        }

        static Gallery = class {
            static getAll = "/Gallery/GetAll";
        }

        static Credits = class {
            static getNonZero = "/Credits/GetNonZero"
            static getLastModifiedDateTime = "/Credits/GetLastModifiedDateTime"
        }

        static Statistics = class {
            static savePageEntry = "/Statistics/SavePageEntry";
        }
    }
}

export class InfrastructureLinks {
    static adminHome = '/IS/';
    static forbidden = '/Error/403';
    static notFound = '/Error/404';
    static UnknownError = '/Error/:statusCode';

    static statusCode(status: number): string {
        return `/Error/${status}`;
    }
}

export class AuthLinks {
    static autentication = '/IS/Authentication';
    static authorize = '/IS/Authorization/Authorize';
    static changePermission = '/IS/Authorization';
    static changeTokenPermission = '/IS/Authorization/ChangeTokenPermission';
    static login = '/IS/Authentication/LogIn';
    static logOut = '/IS/Authentication/LogOut';
}

export class AccessPolicyLinks {
    static getAccessPolicies = '/IS/AccessPolicies/GetPolicies';
    static getByRoleId = '/IS/AccessPolicies/GetByUserAccessRole';
}

export class ConfigurationLinks {
    static save = '/IS/Configurations/Save';
    static getPaged = '/IS/Configurations/GetConfigurationsPaged';
    static remove = '/IS/Configurations/Remove';
}

export class ContactLinks {
    static save = '/IS/Contacts/Save';
    static getAll = '/IS/Contacts/GetAll';
}

export class AppealLinks {
    static getPaged = '/IS/Appeals/GetPaged';
    static setViewed = '/IS/Appeals/SetViewed';
}

export class GardenerLinks {
    static save = '/IS/Gardeners/Save';
    static getAll = '/IS/Gardeners/GetAll';
    static getPaged = '/IS/Gardeners/GetPaged';
    static remove = '/IS/Gardeners/Remove';
}

export class GardenSectorLinks {
    static save = '/IS/GardenSectors/Save';
    static getAll = '/IS/GardenSectors/GetAll';
    static getPaged = '/IS/GardenSectors/GetPaged';
    static remove = '/IS/GardenSectors/Remove';
}

export class SectorSaleLinks {
    static save = '/IS/SectorSales/Save';
    static getPaged = '/IS/SectorSales/GetPaged';
    static remove = '/IS/SectorSales/Remove';
}

export class PhotosLinks {
    static save = "/IS/Photos/Save";
    static getAll = "/IS/Photos/GetAllPhotos";
    static delete = "/IS/Photos/Delete";
}

export class SectorCreditsLinks {
    static save = "/IS/Credits/Save";
    static tryRenderReport = "/IS/Credits/TryRenderReport";
    static getPaged = "/IS/Credits/GetPaged";
}

export class AdLinks {
    static save = '/IS/Ads/Save';
    static getPaged = '/IS/Ads/GetAdsPaged';
    static getOffered = '/IS/Ads/GetOfferedAds';
    static getOfferedCount = '/IS/Ads/GetOfferedAdsCount';
    static getArchived = '/IS/Ads/GetArchiveAds';
    static takeOff = '/IS/Ads/TakeOffAd';
    static publish = '/IS/Ads/Publish';
    static remove = '/IS/Ads/Remove';
}

export class NoveltyLinks {
    static save = '/IS/Novelties/Save';
    static getPaged = '/IS/Novelties/GetPaged';
    static getArchived = '/IS/Novelties/GetArchives';
    static takeOff = '/IS/Novelties/TakeOff';
    static publish = '/IS/Novelties/Publish';
    static remove = '/IS/Novelties/Remove';
}

export class UserLinks {
    static save = '/IS/Users/Save';
    static getPaged = '/IS/Users/GetPaged';
    static getPermissions = '/IS/Users/GetPermissions';
    static remove = '/IS/Users/Remove';
}

export class UserAccessRoleLinks {
    static save = '/IS/Users/SaveUserAccessRole';
    static getAll = '/IS/Users/GetUserAccessRoles';
    static getById = '/IS/Users/GetUserAccessRoleById';
    static remove = '/IS/Users/RemoveUserAccessRole';
}

export class StatisticsLinks {
    static getPageEntries = "/IS/Statistics/GetPageEntries";
}