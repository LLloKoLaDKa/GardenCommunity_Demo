import { PageEntryType } from "./pageEntryType";

export class PageEntryBlank {
    constructor(
        public id: string | null,
        public type: PageEntryType
    ) { }

    public static create(type: PageEntryType): PageEntryBlank {
        return new PageEntryBlank(null, type);
    }
}