using System;

namespace GC.Domain.Users
{
    public class UserPermission
    {
        public Guid Id { get; set; }
        public Guid AccessRoleId { get; set; }

        public UserPermission(Guid id, Guid userAccessRole)
        {
            Id = id;
            AccessRoleId = userAccessRole;
        }
    }
}
