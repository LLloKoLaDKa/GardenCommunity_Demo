using GC.Domain.Users;
using GC.Tools.Extensions;
using GC.WebSpace.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System;
using System.Net;

namespace GC.WebSpace.Infrastructure.Filters
{
    public static class ExceptionFilter
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    var exceptionFeatures = context.Features.Get<IExceptionHandlerFeature>();
                    var exception = exceptionFeatures?.Error;

                    if (exception != null)
                    {
                        try
                        {
                            SystemUser user = (SystemUser)context.Items[CookieNames.SystemUser];
                            //Logger.SendError(exception.Message, DateTime.UtcNow, "SMMS.WebSpace", exception.StackTrace, null, user.Id.ToString(), user.Login, user.Permission.AccessRole.ToString());
                        }
                        catch
                        {
                            // ignored
                        }
                    }

                    if (context.Request.IsAjaxRequest())
                    {
                        ClearAjaxRequest(context);
                    }
                    else
                    {
                        context.Response.Redirect("/Error/500");
                    }
                });
            });
        }

        private static void ClearAjaxRequest(HttpContext context)
        {
            context.Response.Clear();
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";
        }
    }
}