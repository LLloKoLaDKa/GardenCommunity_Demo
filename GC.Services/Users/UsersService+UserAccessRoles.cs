using GC.Domain.Services.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using System;

namespace GC.Services.Users
{
    public partial class UsersService : IUsersService // + UserAccessRoles
    {

        public Result SaveUserAccessRole(UserAccessRoleBlank userAccessRoleBlank, Guid systemUserId)
        {
            if (!userAccessRoleBlank.IsValid(out Result result)) return result;

            _usersRepository.SaveUserAccessRole(userAccessRoleBlank, systemUserId);

            return Result.Success();
        }

        public UserAccessRole[] GetUserAccessRoles()
        {
            return _usersRepository.GetUserAccessRoles();
        }

        public Result RemoveUserAccessRole(Guid roleId, Guid systemUserId)
        {
            _usersRepository.RemoveUserAccessRole(roleId, systemUserId);

            return Result.Success();
        }
    }
}
