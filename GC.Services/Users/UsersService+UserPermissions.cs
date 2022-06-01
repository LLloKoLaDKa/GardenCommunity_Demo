using GC.Domain.Services.Users;
using GC.Domain.Users;
using System;

namespace GC.Services.Users
{
    public partial class UsersService : IUsersService // + UsersPermissions
    {
        public UserPermission[] GetUserPermissions(Guid userId)
        {
            return _usersRepository.GetUserPermissions(userId);
        }
    }
}
