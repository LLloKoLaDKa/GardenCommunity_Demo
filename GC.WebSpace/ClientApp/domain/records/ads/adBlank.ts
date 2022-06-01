import { Ad } from "./ad";
import { AdType } from "./adType";

export class AdBlank {
    constructor(
        public id: string | null,
        public type: AdType | null,
        public title: string | null,
        public description: string | null,
        public firstName: string | null,
        public middleName: string | null,
        public lastName: string | null,
        public phoneNumber: string | null,
        public publishDate: Date | null,
        public image: string | null
    ) { }
}

export namespace AdBlank {
    export function empty() {
        return new AdBlank(null, null, null, null, null, null, null, null, null, null);
    }

    export function create(ad: Ad) {
        return new AdBlank(ad.id, ad.type, ad.title, ad.description, ad.firstName, ad.middleName, ad.lastName, ad.phoneNumber,
            ad.publishDate, ad.image);
    }
}