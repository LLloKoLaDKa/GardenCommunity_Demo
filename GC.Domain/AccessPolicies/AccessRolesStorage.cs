using GC.Domain.Services.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.Tools.Types.Results;
using System;
using System.Linq;

namespace GC.Domain.AccessPolicies
{
    public class UserAccessRolesStorage
    {
        private static UserAccessRolesStorage _storage;
        private readonly IUsersService _usersService;
        private UserAccessRole[] _userAccessRoles;

        public static UserAccessRole[] Roles
        {
            get
            {
                if (_storage is null) throw new Exception("Storage не инициализирован");
                UserAccessRole superRole = new UserAccessRole(UserAccessRole.SuperRoleId, "Супер-пользователь", Enum.GetValues<AccessPolicy>());

                return _storage._userAccessRoles.Append(superRole).ToArray();
            }
        }

        public UserAccessRolesStorage(IUsersService usersService)
        {
            _usersService = usersService;
            _userAccessRoles = _usersService.GetUserAccessRoles();
        }

        public static void Initialize(IUsersService usersService)
        {
            _storage = new UserAccessRolesStorage(usersService);
        }

        public static Result Save(UserAccessRoleBlank userAccessRoleBlank, Guid userId)
        {
            if (_storage is null) throw new Exception("Storage не инициализирован");
            if (userAccessRoleBlank is null) Result.Fail("Некорректная роль");
            UserAccessRole role = _storage._userAccessRoles.FirstOrDefault(r => r.Id == userAccessRoleBlank.Id);

            if (role == null)
            {
                userAccessRoleBlank.Id = Guid.NewGuid();
                _storage._userAccessRoles = _storage._userAccessRoles.Append(new UserAccessRole(
                    userAccessRoleBlank.Id.Value,
                    userAccessRoleBlank.Title,
                    userAccessRoleBlank.AccessPolicies.ToAccessPolicies())
                ).ToArray();
            }
            else
            {
                role.Update(
                    userAccessRoleBlank.Id.Value,
                    userAccessRoleBlank.Title,
                    userAccessRoleBlank.AccessPolicies.ToAccessPolicies()
                );
            }

            Result result = _storage._usersService.SaveUserAccessRole(userAccessRoleBlank, userId);
            if (!result.IsSuccess) return Result.Fail(result.Errors);

            return result;
        }

        public static Result Remove(Guid id, Guid userId)
        {
            if (_storage is null) throw new Exception("Storage не инициализирован");
            if (id == null) return Result.Fail("Некорректная роль");

            Int32 count = _storage._usersService.GetCountUsersByRoleId(id);
            if (count > 0) return Result.Fail($"Невозможно удалить роль. \nПользователей с ролью: {count}");

            _storage._userAccessRoles = _storage._userAccessRoles.Where(aus => aus.Id != id).ToArray();
            _storage._usersService.RemoveUserAccessRole(id, userId);

            return Result.Success();
        }
    }
}