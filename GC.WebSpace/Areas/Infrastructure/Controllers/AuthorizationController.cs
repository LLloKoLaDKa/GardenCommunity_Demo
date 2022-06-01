using Microsoft.AspNetCore.Mvc;
using GC.Domain.AccessPolicies;
using GC.Domain.Services.Users;
using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.Tools.Managers;
using GC.Tools.Types.Results;
using System;
using System.Linq;
using GC.WebSpace.Infrastructure;

namespace GC.WebSpace.Areas.Infrastructure.Controllers
{
    public class AuthorizationController : BaseController
    {
        private readonly IUsersService _usersService;

        public AuthorizationController(IUsersService usersAuthorizationService)
        {
            _usersService = usersAuthorizationService;
        }

        [Route("/IS/Authorization")]
        public ActionResult Authorization()
        {
            string tokenString = (string)CookieManager.Read(Request, CookieNames.SystemUserToken);
            if (string.IsNullOrWhiteSpace(tokenString)) return Redirect("/IS/Authentication");

            UserToken token = _usersService.GetToken(tokenString);
            if (token is null) return Redirect("/IS/Authentication");
            if (token.IsAuthorized) return Redirect("/IS/");

            User user = _usersService.GetUser(token.UserId);
            if (user is null) return Redirect("/IS/Authentication");

            UserPermission[] userPermissions = _usersService.GetUserPermissions(user.Id);
            if (userPermissions is null) return Redirect("/IS/Authentication");
            if (userPermissions.Length == 1)
            {
                Result result = _usersService.Authorize(token, userPermissions[0]);
                if (result.IsSuccess) return Redirect("/IS/");
            }

            UserAccessRole[] userAccessRoles = UserAccessRolesStorage.Roles
                .Where(role => userPermissions.ToList().Exists(p => p.AccessRoleId == role.Id)).ToArray();

            return ReactApp("auth", "Авторизация", payload: new { userPermissions, userAccessRoles });
        }

        [HttpPost("/IS/Authorization/Authorize")]
        public ActionResult<Result> Authorize([FromBody] UserPermissionBlank permission)
        {
            string tokenString = (string)CookieManager.Read(Request, CookieNames.SystemUserToken);
            if (string.IsNullOrWhiteSpace(tokenString)) return Redirect("/IS/Authentication");

            UserToken token = _usersService.GetToken(tokenString);
            if (token is null) return Redirect("/IS/Authentication");
            if (token.IsAuthorized) return Result.Success();

            Result result = _usersService.Authorize(token, new UserPermission(permission.Id.Value, permission.AccessRoleId.Value));
            if (!result.IsSuccess) return result;

            return Result.Success();
        }

        [HttpPost("/IS/Authorization/ChangeTokenPermission")]
        public ActionResult<Result> ChangeTokenPermission()
        {
            string tokenString = (string)CookieManager.Read(Request, CookieNames.SystemUserToken);
            if (string.IsNullOrWhiteSpace(tokenString)) return Redirect("/IS/Authentication");

            UserToken token = _usersService.GetToken(tokenString);
            if (token is null) return Redirect("/IS/Authentication");

            User user = _usersService.GetUser(token.UserId);
            if (user is null) return Redirect("/IS/Authentication");

            UserPermission[] userPermissions = _usersService.GetUserPermissions(user.Id);
            if (userPermissions is null) return Redirect("/IS/Authentication");
            if (userPermissions.Length == 1) return Result.Fail("У вас имеется только одна роль!");

            _usersService.ClearTokenPermission(token.UserId);

            return Result.Success();
        }
    }
}
