import { InfrastructureLinks } from './links';

export class HttpClient {
    private static toQueryString(obj: any) {
        return obj
            ? `?${Object.keys(obj)
                .map(k => {
                    if (Array.isArray(obj[k]))
                        return (obj[k] as any[])
                            .map(val => `${encodeURIComponent(k)}=${encodeURIComponent(val)}`)
                            .join('&');

                    if (obj[k] instanceof Date)
                        return `${encodeURIComponent(k)}=${encodeURIComponent(obj[k].toISOString())}`;

                    return `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`;
                }).join('&')}`
            : '';
    }

    public static getHeaders(): Headers {
        let headers: Headers = new Headers();
        headers.append('X-Requested-With', 'XMLHttpRequest')

        return headers;
    }

    public static async getAsync(url: string, data?: any, host: string = ''): Promise<any> {
        let fullUrl = `${host}${url}${HttpClient.toQueryString(data)}`;
        const headers = HttpClient.getHeaders();

        const resp = await fetch(fullUrl, { method: 'GET', headers: headers });

        const response = await HttpClient.httpHandler(resp);
        return await response.json();
    }

    public static async postAsync(url: string, data: any, host: string = ''): Promise<any> {
        let fullUrl = `${host}${url}`;

        let headers: Headers = HttpClient.getHeaders();
        headers.append('Content-Type', 'application/json');

        const response = await HttpClient.httpHandler(
            await fetch(fullUrl,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                }));

        return await response.json();
    }

    private static httpHandler(response: Response): Promise<Response> {
        if (response.redirected) {
            window.location.href = response.url;
            return Promise.reject();
        }

        if (response.ok) return Promise.resolve(response);

        window.location.href = InfrastructureLinks.statusCode(response.status);
        return Promise.reject(`${response.status} - unknown status code`);
    }
}

export default HttpClient;
