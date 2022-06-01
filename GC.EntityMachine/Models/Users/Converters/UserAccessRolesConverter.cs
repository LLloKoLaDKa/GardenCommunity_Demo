using GC.Domain.AccessPolicies;
using GC.Domain.Users.UserAccessRoles;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Users.Converters
{
    internal static class UserAccessRolesConverter
    {
        internal static UserAccessRole ToUserAccessRole(this UserAccessRoleDb db)
        {
            AccessPolicy[] accessPolicies = db.AccessPolicies.Select(ap => (AccessPolicy)Enum.Parse(typeof(AccessPolicy), ap)).ToArray();
            return new UserAccessRole(db.Id, db.Title, accessPolicies);
        }

        internal static UserAccessRole[] ToUserAccessRoles(this IEnumerable<UserAccessRoleDb> dbs)
        {
            return dbs.Select(ToUserAccessRole).ToArray();
        }

        internal static UserAccessRoleDb ToUserAccessRoleDb(this UserAccessRoleBlank role, Guid systemUserId, bool deletable = false)
        {
            return new UserAccessRoleDb(role.Id.Value, role.Title, role.AccessPolicies, DateTime.Now, systemUserId, deletable);
        }
    }
}
