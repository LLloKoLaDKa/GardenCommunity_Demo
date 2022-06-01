using GC.Domain.AccessPolicies;
using GC.Domain.Services.Users;
using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.Tools.Types.Results;
using GC.WebSpace.Infrastructure.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using GC.WebSpace.Areas.Infrastructure.Controllers;

namespace GC.WebSpace.Areas.Users.Controllers
{
    public class UsersController : BaseAuthorizedController
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [Route("/IS/Users")]
        [IsAuthorized(AccessPolicy.Users_Catalog)]
        public ViewResult Index() => ReactApp("users", "Пользователи");

        [HttpPost("/IS/Users/Save")]
        [IsAuthorized(AccessPolicy.Users_Catalog)]
        public Result SaveUser([FromBody] UserBlank userBlank)
        {
            return _usersService.SaveUser(userBlank, SystemUser.Id);
        }

        [HttpPost("/IS/Users/SaveUserAccessRole")]
        [IsAuthorized(AccessPolicy.AccessPolicies)]
        public Result SaveUserAccessRole([FromBody] UserAccessRoleBlank userAccessRoleBlank)
        {
            return UserAccessRolesStorage.Save(userAccessRoleBlank, SystemUser.Id);
        }

        [HttpGet("/IS/Users/GetByIds")]
        [IsAuthorized(AccessPolicy.Users_Catalog)]
        public User[] GetUsersByIds(Guid[] userIds)
        {
            return _usersService.GetUsers(userIds);
        }

        [HttpGet("/IS/Users/GetPermissions")]
        [IsAuthorized(AccessPolicy.Users_Catalog)]
        public UserPermission[] GetPermissions(Guid userId)
        {
            return _usersService.GetUserPermissions(userId);
        }

        [HttpGet("/IS/Users/GetUserAccessRoles")]
        [IsAuthorized(AccessPolicy.Users_Catalog, AccessPolicy.AccessPolicies)]
        public UserAccessRole[] GetAccessRoles()
        {
            return UserAccessRolesStorage.Roles.Where(role => role.Id != UserAccessRole.SuperRoleId).ToArray();
        }

        [HttpGet("/IS/Users/GetUserAccessRoleById")]
        [IsAuthorized]
        public UserAccessRole GetAccessRoleById(Guid userId)
        {
            return UserAccessRolesStorage.Roles.FirstOrDefault(role => role.Id == userId);
        }

        [HttpGet("/IS/Users/GetPaged")]
        [IsAuthorized(AccessPolicy.Users_Catalog)]
        public PagedResult<User> GetUsersPaged(int page, int count)
        {
            return _usersService.GetUsersPaged(page, count);
        }

        [HttpGet("/IS/Users/Search")]
        [IsAuthorized(AccessPolicy.GardenSectors_Catalog)]
        public User[] SearchUsers(string login)
        {
            return _usersService.SearchUsers(login);
        }

        [HttpPost("/IS/Users/Remove")]
        [IsAuthorized(AccessPolicy.Users_Catalog)]
        public Result RemoveUser([FromBody] Guid userId)
        {
            return _usersService.RemoveUser(userId, SystemUser.Id);
        }

        [HttpPost("/IS/Users/RemoveUserAccessRole")]
        [IsAuthorized(AccessPolicy.AccessPolicies)]
        public Result RemoveUserAccessRole([FromBody] Guid roleId)
        {
            return UserAccessRolesStorage.Remove(roleId, SystemUser.Id);
        }
    }
}
