import { mapToSidebarItem, SidebarItem } from "./sidebarItem";

export default class SidebarLinksTree {

    public static items: SidebarItem[] = [];
    public static itemsWithoutTree: SidebarItem[] = [];

    public static loadSideBar() {
        const sidebarLinksTree = (window as any).sidebarLinksTree
    
        if (sidebarLinksTree == null || sidebarLinksTree == undefined) return;

        const items = (sidebarLinksTree as any[]).map(d => mapToSidebarItem(d));
        SidebarLinksTree.items = items;
        SidebarLinksTree.itemsWithoutTree = SidebarLinksTree.getItemsWithoutTree(items);
    }

    public static getItemsWithoutTree(items: SidebarItem[]): SidebarItem[] {
        return items.flatMap(i => i.innerItemsWithoutTree).concat(items);
    }

}

SidebarLinksTree.loadSideBar();
