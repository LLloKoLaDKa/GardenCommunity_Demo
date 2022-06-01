using GC.Domain.AccessPolicies;
using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.WebSpace.Infrastructure.Sidebars;
using System;
using System.Linq;

namespace GC.WebSpace.Infrastructure.ReactApp
{
    public struct ReactApp
    {
        public string Name { get; }
        public string PageTitle { get; }
        public string ContainerId { get; }

        public SystemUser SystemUser { get; private set; }
        public SidebarItem[] SidebarLinksTree { get; private set; }
        public object Payload { get; private set; }

        public string[] AvailableAccessPolicies
        {
            get
            {
                if (SystemUser == null) return new string[0];

                UserPermission permission = SystemUser.Permission;
                UserAccessRole userAccessRole = UserAccessRolesStorage.Roles.FirstOrDefault(ars => ars.Id == permission.Id);
                if (userAccessRole is null) return new string[0];

                return Enum.GetValues<AccessPolicy>().Select(ap => new Policy(ap))
                    .Where(p => p.UserHasPermission(userAccessRole))
                    .Select(p => p.Key).ToArray();
            }
        }

        public ReactApp(string name, string pageTitle, string containerId = "app", object payload = null)
        {
            Name = name;
            PageTitle = pageTitle;
            ContainerId = containerId;
            SystemUser = null;
            Payload = payload;
            SidebarLinksTree = new SidebarItem[0];
        }

        public ReactApp WithSystemUser(SystemUser systemUser)
        {
            SystemUser = systemUser;
            return this;
        }

        public ReactApp WithSidebar()
        {
            SidebarLinksTree = Sidebar.GetLinksTree(SystemUser);
            return this;
        }

        public ReactApp WithPayload(object payload)
        {
            Payload = payload;
            return this;
        }
    }
}
