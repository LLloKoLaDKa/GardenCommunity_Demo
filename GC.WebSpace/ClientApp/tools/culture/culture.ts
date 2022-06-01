import { Locale } from 'date-fns';
import en from 'date-fns/locale/en-US';
import ru from 'date-fns/locale/ru';
import Cookie from '../cookie/cookie';

interface Culture {
    value: string;
    shortValue: string;
    name: string;
    shortName: string;
    monthYearFormat: string;
    dateFormat: string;
    dateFormatWithShortTime: string;
    dateFormatWithTime: string;
    shortTimeFormat: string;
    timeFormat: string;
    T: string;
    locale: Locale;
}

export const cultures: Culture[] = [
    {
        value: 'ru-RU',
        shortValue: 'ru',
        name: 'Русский',
        shortName: 'Ру',
        monthYearFormat: 'LLLL yyyy',
        dateFormat: 'dd.MM.yyyy',
        dateFormatWithShortTime: 'dd.MM.yyyy HH:mm',
        dateFormatWithTime: 'dd.MM.yyyy HH:mm:ss',
        shortTimeFormat: 'HH:mm',
        timeFormat: 'HH:mm:ss',
        T: "yyyy-MM-dd'T'HH:mm:ss.SSS",
        locale: ru
    },
    {
        value: 'en-US',
        shortValue: 'en',
        name: 'English',
        shortName: 'En',
        monthYearFormat: 'LLLL yyyy',
        dateFormat: 'MM/dd/yyyy',
        dateFormatWithShortTime: 'MM/dd/yyyy hh:mm a',
        dateFormatWithTime: 'MM/dd/yyyy hh:mm:ss a',
        shortTimeFormat: 'hh:mm a',
        timeFormat: 'hh:mm:ss a',
        T: "yyyy-MM-dd'T'HH:mm:ss.SSS",
        locale: en
    }
];

const cultureCookieKey = 'CurrentCulture';

const getCurrentCulture = (): Culture => {
    var culture = cultures.find(x => x.value == Cookie.get(cultureCookieKey));
    if (culture == undefined) {
        culture = cultures[0];
        setCurrentCulture(culture.value);
        return culture;
    }

    return culture;
};

export const setCurrentCulture = (culture: string): void => {
    Cookie.set(cultureCookieKey, culture);
};

export const currentCulture = getCurrentCulture();
