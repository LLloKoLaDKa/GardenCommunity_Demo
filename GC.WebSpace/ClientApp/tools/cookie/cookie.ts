import addYears from 'date-fns/addYears';

interface CookieParams {
    path: string | null;
    expires: Date | null;
}

const defaultCookieParams: CookieParams = {
    path: '/',
    expires: addYears(new Date(), 1)
}

export default class Cookie {

    public static get = (name: string): string | null => {
        let matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : null;
    };

    /** TTL по умолчанию = 1 год */
    public static set = (name: string, value: string, params: CookieParams = defaultCookieParams) => {
        var cookie = `${name}=${value}; path=${params.path ?? '/'};`;
        if (params.expires != null) cookie += ` expires=${params.expires.toUTCString()};`
        else cookie += ` expires=${addYears(new Date(), 1)}`;
        document.cookie = cookie;
    };

    public static remove = (name: string) => {
        const lastMonth = new Date(new Date().setDate(0));
        document.cookie = `${name}=; path=/; expires=${lastMonth.toUTCString()}`;
    }

}
