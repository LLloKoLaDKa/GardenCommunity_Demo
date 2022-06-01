using System;

namespace GC.Domain.Users
{
    public class SystemUser
    {
        public Guid Id { get; }
        public String Login { get; }
        public UserPermission Permission { get; }
        public Boolean HasOtherPermissions { get; }
        public String[] AvailableAccessPolicies { get; }

        public SystemUser(User user, UserPermission permission, Boolean hasOtherPermissions, String[] availableAccessPolicies)
        {
            Id = user.Id;
            Login = user.Login;
            Permission = permission;
            HasOtherPermissions = hasOtherPermissions;
            AvailableAccessPolicies = availableAccessPolicies;
        }
    }
}
