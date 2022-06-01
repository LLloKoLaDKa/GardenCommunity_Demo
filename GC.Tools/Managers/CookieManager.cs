using Microsoft.AspNetCore.Http;
using System;
using System.Net;

namespace GC.Tools.Managers
{
    public static class CookieManager
    {
        /// <summary>
        /// Запись в Cookie
        /// </summary>
        public static void Write(HttpResponse response, Cookie cookie, DateTime expires)
        {
            CookieOptions options = new CookieOptions();
            options.Expires = expires;

            response.Cookies.Append(cookie.Name, cookie.Value, options);
        }

        /// <summary>
        /// Чтение из Cookie
        /// </summary>
        public static Object Read(HttpRequest request, String cookie)
        {
            return request.Cookies[cookie];
        }

        /// <summary>
        /// Удаление из Cookie
        /// </summary>
        public static void Delete(HttpResponse response, String cookie)
        {
            response.Cookies.Delete(cookie);
        }
    }
}
