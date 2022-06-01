using GC.Domain.Users;
using GC.EntitiesCore.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Users.Converters
{
    internal static class UserPermissionsConverter
    {
        internal static UserPermission ToUserPermission(this UserPermissionDb db)
        {
            return new UserPermission(db.Id, db.UserAccessRoleId);
        }

        internal static UserPermission[] ToUserPermissions(this IEnumerable<UserPermissionDb> dbs)
        {
            return dbs.Select(ToUserPermission).ToArray();
        }

        internal static UserPermissionDb ToUserPermissionDb(this UserPermissionBlank permissionBlank, Guid userId)
        {
            return new UserPermissionDb(permissionBlank.Id.Value, userId, permissionBlank.AccessRoleId.Value, DateTime.Now);
        }
    }
}
