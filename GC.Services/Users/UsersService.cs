using GC.Domain.Services.Users;
using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.EntitiesCore.Repositories.Users;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using System;
using System.Linq;

namespace GC.Services.Users
{
    public partial class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;

        public UsersService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public Result SaveUser(UserBlank userBlank, Guid systemUserId)
        {
            if (!userBlank.IsValid(out Result result)) return result;

            User oldUser = _usersRepository.GetUser(userBlank.Login);
            if (oldUser is not null)
            {
                if (oldUser.Id != userBlank.Id) return Result.Fail("Пользователь с таким логином уже существует");

                UserPermission[] existPermissions = GetUserPermissions(oldUser.Id);
                UserPermission superUserPermission = existPermissions.FirstOrDefault(p => p.AccessRoleId == UserAccessRole.SuperRoleId);
                UserPermissionBlank existPermissionBlank = userBlank.Permissions.FirstOrDefault(p => p.AccessRoleId == UserAccessRole.SuperRoleId);
                if (superUserPermission is not null && existPermissionBlank is null)
                {
                    userBlank.Permissions = userBlank.Permissions
                        .Append(new UserPermissionBlank
                        {
                            Id = UserAccessRole.SuperRoleId,
                            AccessRoleId = superUserPermission.AccessRoleId
                        })
                        .ToArray();
                }
            }

            foreach (UserPermissionBlank blank in userBlank.Permissions)
            {
                blank.Id = Guid.NewGuid();
            }

            if (userBlank.Id is null) userBlank.Id = Guid.NewGuid();
            _usersRepository.SaveUser(userBlank, systemUserId);

            return Result.Success();
        }

        public User GetUser(Guid userId)
        {
            return _usersRepository.GetUser(userId);
        }

        public User[] GetUsers(Guid[] userIds)
        {
            if (userIds.Length == 0) return Array.Empty<User>();

            return _usersRepository.GetUsers(userIds);
        }

        public User[] SearchUsers(String login)
        {
            return _usersRepository.SearchUsers(login);
        }

        public PagedResult<User> GetUsersPaged(Int32 page, Int32 count)
        {
            return _usersRepository.GetUsersPaged(page, count);
        }

        public Int32 GetCountUsersByRoleId(Guid roleId)
        {
            return _usersRepository.GetCountPermissionsByRoleId(roleId);
        }

        public Result RemoveUser(Guid userId, Guid systemUserId)
        {
            _usersRepository.RemoveUser(userId, systemUserId);
            return Result.Success();
        }
    }
}