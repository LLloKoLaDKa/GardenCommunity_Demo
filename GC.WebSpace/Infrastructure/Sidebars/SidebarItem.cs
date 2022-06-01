using GC.Domain.AccessPolicies;
using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using System;
using System.Linq;

namespace GC.WebSpace.Infrastructure.Sidebars
{
    public class SidebarItem
    {
        public Guid Id { get; }
        public string Text { get; }
        public string Url { get; }
        public string CssClassName { get; }
        public SidebarItem[] InnerItems { get; }
        public AccessPolicy[] AvailableForAccessPolicies { get; }

        public static SidebarItem ListItem(string text, string url, string cssClassName, AccessPolicy policy = AccessPolicy.EnoughAuthorization)
            => new(text, url, cssClassName, new[] { policy });

        public static SidebarItem ListItem(string text, string url, string cssClassName, AccessPolicy[] policies)
            => new(text, url, cssClassName, policies);
        private SidebarItem(string text, string url, string cssClassName, AccessPolicy[] availableForAccessPolicies)
        {
            Id = Guid.NewGuid();
            Text = text;
            Url = url;
            CssClassName = cssClassName;
            InnerItems = new SidebarItem[0];
            AvailableForAccessPolicies = availableForAccessPolicies;
        }

        public static SidebarItem ListGroup(string text, string cssClassName, SidebarItem[] innerItems)
            => new(text, cssClassName, innerItems);

        private SidebarItem(string text, string cssClassName, SidebarItem[] innerItems)
        {
            Id = Guid.NewGuid();
            Text = text;
            Url = string.Empty;
            CssClassName = cssClassName;
            InnerItems = innerItems;
            AvailableForAccessPolicies = innerItems.SelectMany(i => i.AvailableForAccessPolicies).Distinct().ToArray();
        }

        public bool UserHasPermission(UserPermission userPermission)
        {
            UserAccessRole role = UserAccessRolesStorage.Roles.FirstOrDefault(role => role.Id == userPermission.AccessRoleId);
            return AvailableForAccessPolicies.Any(p => p.Policy().UserHasPermission(role));
        }

        public SidebarItem Clone()
        {
            return InnerItems.Any()
                ? ListGroup(Text, CssClassName, InnerItems)
                : ListItem(Text, Url, CssClassName, AvailableForAccessPolicies);
        }
    }
}
