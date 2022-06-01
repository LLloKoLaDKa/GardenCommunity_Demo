
export class SidebarItem {

    constructor(
        public readonly id: string,
        public readonly text: string,
        public readonly url: string,
        public readonly cssClassName: string,
        public readonly innerItems: SidebarItem[]
    ) {
    }

    public get innerItemsWithoutTree(): SidebarItem[] {
        return this.innerItems.concat(this.innerItems.flatMap(i => i.innerItemsWithoutTree));
    }

}

export const mapToSidebarItem = (data: any): SidebarItem => {
    const innerItems = data.innerItems ? (data.innerItems as any[]).map(i => mapToSidebarItem(i)) : [];
    return new SidebarItem(data.id, data.text, data.url, data.cssClassName, innerItems);
}
