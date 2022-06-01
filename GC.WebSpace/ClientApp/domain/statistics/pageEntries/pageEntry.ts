import { PageEntryType } from "./pageEntryType";

export class PageEntry {
    constructor(
        public readonly id: string,
        public readonly type: PageEntryType
    ) { }
}

export namespace PageEntry {
    export function toModel(data: any): PageEntry {
        return new PageEntry(data.id, data.type);
    }

    export function toModels(data: any[]): PageEntry[] {
        return data.map(toModel);
    }
}