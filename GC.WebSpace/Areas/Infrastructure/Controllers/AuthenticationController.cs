using GC.Domain.Services.Users;
using GC.Domain.Users;
using GC.Tools.Managers;
using GC.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Reflection;
using GC.WebSpace.Infrastructure;

namespace GC.WebSpace.Areas.Infrastructure.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly IUsersService _usersService;

        public AuthenticationController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("/IS/Authentication")]
        public ActionResult Authentication()
        {
            string tokenString = (string)CookieManager.Read(Request, CookieNames.SystemUserToken);
            if (string.IsNullOrWhiteSpace(tokenString))
            {
                return ReactApp("auth", "Аутентификация", payload: Assembly.GetExecutingAssembly().GetName().Version.ToString());
            }
            UserToken token = _usersService.GetToken(tokenString);

            if (token is not null)
            {
                User user = _usersService.GetUser(token.UserId);
                if (user is null) return ReactApp("auth", "Аутентификация", payload: Assembly.GetExecutingAssembly().GetName().ToString());

                UserPermission[] userPermissions = _usersService.GetUserPermissions(user.Id);
                if (userPermissions is null) return Redirect("/IS/Authentication");
                if (userPermissions.Length > 1) return Redirect("/IS/Authorization");

                _usersService.Authorize(token, userPermissions[0]);
                return Redirect("/IS/");
            }

            return ReactApp("auth", "Аутентификация", payload: Assembly.GetExecutingAssembly().GetName().ToString());
        }

        [HttpPost("/IS/Authentication/LogIn")]
        public ActionResult<Result> LogIn([FromBody] UserAuthenticationRequest userRequest)
        {
            string oldToken = (string)CookieManager.Read(Request, CookieNames.SystemUserToken);

            if (!string.IsNullOrWhiteSpace(oldToken))
                return Result.Fail("Возможно, вы уже авторизованы. Обновите страницу");

            DataResult<UserToken> logInResult = _usersService.Authenticate(userRequest.Login, userRequest.Password);

            if (!logInResult.IsSuccess) return Result.Fail(logInResult.Errors);

            CookieManager.Write(Response, new System.Net.Cookie(CookieNames.SystemUserToken, logInResult.Data.Id.ToString()), DateTime.MaxValue);

            return Redirect("/IS/Authorization");
        }

        public record UserAuthenticationRequest(string Login, string Password);

        [HttpGet("/IS/Authentication/LogOut")]
        public Result LogOut()
        {
            string token = (string)CookieManager.Read(Request, CookieNames.SystemUserToken);

            if (token is null) return Result.Success();

            _usersService.LogOut(new Guid(token));
            CookieManager.Delete(Response, CookieNames.SystemUserToken);

            return Result.Success();
        }
    }
}
