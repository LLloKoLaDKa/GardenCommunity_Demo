using GC.Domain.AccessPolicies;
using GC.Domain.Services.Users;
using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.Tools.Extensions;
using GC.WebSpace.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Net;

namespace GC.WebSpace.Infrastructure.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    internal class IsAuthorizedAttribute : ActionFilterAttribute
    {
        public AccessPolicy[] AccessPolicies;

        internal IsAuthorizedAttribute(params AccessPolicy[] policies)
        {
            AccessPolicies = policies;
        }

        public void OnActionExecuting(ActionExecutingContext context, IUsersService usersService)
        {
            try
            {
                IRequestCookieCollection cookies = context.HttpContext.Request.Cookies;

                if (!cookies.ContainsKey(CookieNames.SystemUserToken))
                    throw new UnauthenticatedException();

                UserToken token = usersService.GetToken(cookies[CookieNames.SystemUserToken]);
                if (token is null) throw new UnauthenticatedException();
                if (!token.IsAuthorized) throw new UnauthorizedException();

                User user = usersService.GetUser(token.UserId);
                if (user is null) throw new UnauthenticatedException();

                UserPermission[] permissions = usersService.GetUserPermissions(user.Id);
                Guid idPermission = token.PermissionId.Value;
                UserPermission userPermission = permissions.FirstOrDefault(p => p.Id == idPermission);
                if (userPermission is null) throw new UnauthorizedException();

                UserAccessRole userAccessRole = UserAccessRolesStorage.Roles.FirstOrDefault(role => role.Id == userPermission.AccessRoleId);
                if (userAccessRole is null) throw new UnauthorizedException();

                if (AccessPolicies is not null && AccessPolicies.Length > 0 && AccessPolicies.All(policy => !policy.Policy().UserHasPermission(userAccessRole)))
                    throw new UnauthorizedException();

                SystemUser systemUser = new SystemUser(user, userPermission, permissions.Length > 1, userAccessRole.AccessPolicies.Select(policy => policy.Policy().Key).ToArray());
                context.HttpContext.Items[CookieNames.SystemUser] = systemUser;

                usersService.Prolongate(token.Id);
            }
            catch (Exception exception)
            {
                if (exception is UnauthenticatedException)
                    SetUnauthenticated(context);

                else if (exception is UnauthorizedException)
                    SetUnauthorized(context);

                else throw;
            }
        }

        private void SetUnauthenticated(ActionExecutingContext context)
        {
            if (context.HttpContext.Request.IsAjaxRequest())
            {
                ClearAjaxRequest(context);
            }
            else
            {
                context.HttpContext.Response.Cookies.Delete(CookieNames.SystemUserToken);
                context.Result = new RedirectResult("/IS/Authentication");
            }
        }

        private void SetUnauthorized(ActionExecutingContext context)
        {
            if (context.HttpContext.Request.IsAjaxRequest())
            {
                ClearAjaxRequest(context);
            }
            else
            {
                context.Result = new RedirectResult("/Error/403");
            }
        }

        private void ClearAjaxRequest(ActionExecutingContext context)
        {
            context.Result = new EmptyResult();
            context.HttpContext.Response.Clear();
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
        }

        private class UnauthenticatedException : Exception { }

        private class UnauthorizedException : Exception { }
    }

    public class IsAuthorizedFilter : IActionFilter
    {
        private readonly IUsersService _usersService;

        public IsAuthorizedFilter(IUsersService usersService)
        {
            _usersService = usersService ?? throw new ArgumentNullException(nameof(IUsersService));
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            IsAuthorizedAttribute authAttribute = context.ActionDescriptor.FilterDescriptors
                .OrderByDescending(d => d.Scope)
                .Select(d => d.Filter)
                .OfType<IsAuthorizedAttribute>()
                .FirstOrDefault();

            authAttribute?.OnActionExecuting(context, _usersService);
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // no implementation
        }
    }
}
