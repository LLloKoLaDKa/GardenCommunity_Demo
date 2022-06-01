import { getCookie, CookieNames, setCookie } from './cookie';
import { Locale } from 'date-fns';
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';

interface Culture {
    value: string;
    shortValue: string;
    name: string;
    shortName: string;
    dateFormat: string;
    dateFormatWithShortTime: string;
    dateFormatWithTime: string;
    time: string;
    locale: Locale;
    dayOfYear: string
}

export const cultures: Culture[] = [
    {
        value: 'en-US',
        shortValue: 'en',
        name: 'English',
        shortName: 'En',
        dateFormat: 'MM/dd/yyyy',
        dateFormatWithShortTime: 'MM/dd/yyyy hh:mm a',
        dateFormatWithTime: 'MM/dd/yyyy hh:mm:ss a',
        time: 'HH:mm:ss',
        locale: en,
        dayOfYear: 'MMMM d',
        
    },
    {
        value: 'ru-RU',
        shortValue: 'ru',
        name: 'Русский',
        shortName: 'Ру',
        dateFormat: 'dd.MM.yyyy',
        dateFormatWithShortTime: 'dd.MM.yyyy HH:mm',
        dateFormatWithTime: 'dd.MM.yyyy HH:mm:ss',
        time: 'HH:mm:ss',
        locale: ru,
        dayOfYear: 'd MMMM',
    }
];

export const getCurrentCulture = (): Culture => {
    const culture = getCookie(CookieNames.currentCulture);

    return cultures.find(x => x.value == culture)!;
};

export const setCurrentCulture = (culture: string): void => {
    setCookie(CookieNames.currentCulture, culture, { path: '/' });
    window.location.reload();
};

export const currentCulture = getCurrentCulture();
