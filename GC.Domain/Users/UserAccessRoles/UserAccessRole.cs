using GC.Domain.AccessPolicies;
using System;
using System.Linq;
using System.Text.Json.Serialization;

namespace GC.Domain.Users.UserAccessRoles
{
    public class UserAccessRole
    {
        public static Guid SuperRoleId = Guid.Parse("9b4dd513-7ac6-4ee8-ab3f-8ff0dbd957d0");

        public Guid Id { get; private set; }
        public String Title { get; private set; }

        [JsonIgnore]
        public AccessPolicy[] AccessPolicies { get; private set; }

        public UserAccessRole(Guid id, String title, AccessPolicy[] accessPolicies)
        {
            Id = id;
            Title = title;
            AccessPolicies = accessPolicies;
        }

        public void Update(Guid id, String title, AccessPolicy[] accessPolicies)
        {
            Id = id;
            Title = title;
            AccessPolicies = accessPolicies;
        }
    }

    public static class UserRoleExtensions
    {
        public static AccessPolicy[] ToAccessPolicies(this String[] values)
        {
            return values.Select(ap => Enum.Parse<AccessPolicy>(ap)).ToArray();
        }
    }
}
