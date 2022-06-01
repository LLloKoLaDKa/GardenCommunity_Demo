using Microsoft.AspNetCore.Mvc;
using GC.WebSpace.Infrastructure.Filters;
using GC.WebSpace.Infrastructure.ReactApp;
using GC.Domain.Users;
using System;
using GC.WebSpace.Infrastructure;

namespace GC.WebSpace.Areas.Infrastructure.Controllers
{
    public class BaseController : Controller
    {
        public ViewResult ReactApp(string appName, string pageTitle, bool withSidebar = true, object payload = null)
        {
            var app = new ReactApp(appName, pageTitle);

            if (withSidebar) app.WithSidebar();
            if (payload is not null) app.WithPayload(payload);

            return View("ReactApp", app);
        }
    }

    [IsAuthorized]
    public class BaseAuthorizedController : Controller
    {
        protected SystemUser SystemUser => (SystemUser)HttpContext?.Items[CookieNames.SystemUser];

        public ViewResult ReactApp(string appName, string pageTitle, bool withSystemUser = true, bool withSidebar = true, object payload = null)
        {
            var app = new ReactApp(appName, pageTitle);

            if (withSystemUser) app.WithSystemUser(SystemUser);
            if (withSidebar) app.WithSidebar();
            if (payload is not null) app.WithPayload(payload);

            return View("ReactApp", app);
        }
    }
}