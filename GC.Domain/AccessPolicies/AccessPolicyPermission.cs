using GC.Domain.Users.UserAccessRoles;
using System;

namespace GC.Domain.AccessPolicies
{
    public class AccessPolicyPermission
    {
        public UserAccessRole AccessRole { get; }

        public AccessPolicyPermission(UserAccessRole accessRole)
        {
            AccessRole = accessRole;
        }

        public override Boolean Equals(Object obj)
        {
            if (obj is not AccessPolicyPermission permission) return false;
            return AccessRole == permission.AccessRole;
        }
        public override Int32 GetHashCode() => AccessRole.GetHashCode();
    }
}
