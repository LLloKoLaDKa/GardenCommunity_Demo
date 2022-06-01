import { Never } from "../../../tools/never";

export enum PageEntryType {
    Home = 1,
    News = 2,
    CurrentNovelty = 3,
    Ads = 4,
    CurrentAd = 5,
    Information = 6,
    SectorSales = 7,
    SectorCredits = 8,
    Gallery = 9,
    Contacts = 10
}

export namespace PageEntryType {
    export function getDisplayName(type: PageEntryType): string {
        switch (type) {
            case PageEntryType.Home: return "Главная страница";
            case PageEntryType.News: return "Новости";
            case PageEntryType.CurrentNovelty: return "Страница новости";
            case PageEntryType.Ads: return "Объявления";
            case PageEntryType.CurrentAd: return "Странца объявления";
            case PageEntryType.Information: return "Информация";
            case PageEntryType.SectorSales: return "Продажи участков";
            case PageEntryType.SectorCredits: return "Задолженности";
            case PageEntryType.Gallery: return "Галерея";
            case PageEntryType.Contacts: return "Контакты";

            default: throw new Never(type);
        }
    }
}