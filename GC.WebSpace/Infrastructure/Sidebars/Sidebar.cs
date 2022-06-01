using GC.Domain.Users;
using System;
using System.Linq;
using static GC.WebSpace.Infrastructure.Sidebars.SidebarItem;
using static GC.Domain.AccessPolicies.AccessPolicy;

namespace GC.WebSpace.Infrastructure.Sidebars
{
    public static class Sidebar
    {
        private static readonly SidebarItem[] LinkItems =
        {
            ListItem(text: "Сайт", url: "/", cssClassName: "fa fa-home"),
            ListItem(text: "Пользователи", url: "/IS/Users", cssClassName: "fa fa-users", Users_Catalog),
            ListItem(text: "Роли", url: "/IS/AccessPolicies", cssClassName: "fa fa-user-tag",Users_Catalog),
            ListItem(text: "Садоводы", url: "/IS/Gardeners", cssClassName: "fa fa-id-card", Gardeners_Catalog),
            ListItem(text: "Участки", url: "/IS/GardenSectors", cssClassName: "fa fa-house-user", GardenSectors_Catalog),
            ListItem(text: "Обьявления", url: "/IS/Ads", cssClassName: "fa fa-ad", Ads_Catalog),
            ListItem(text: "Новости", url: "/IS/Novelties", cssClassName: "fa fa-newspaper", Novelties_Catalog),
            ListItem(text: "Фотографии", url: "/IS/Photos", cssClassName: "fa fa-camera", Photos_Catalog),
            ListItem(text: "Задолженности", url: "/IS/Credits", cssClassName: "fa fa-money-bill-alt", Credits_Catalog),
            ListItem(text: "Контакты", url: "/IS/Contacts", cssClassName: "fa fa-phone", Contacts_Catalog),
            ListItem(text: "Обращения", url: "/IS/Appeals", cssClassName: "fa fa-envelope", Appeals_List),
            ListItem(text: "Конфигурации", url: "/IS/Configurations", cssClassName: "fa fa-cogs", Configurations_Catalog),
            ListItem(text: "Статистика", url: "/IS/PageEntries", cssClassName: "fa fa-eye", PageEntries_Chart)
        };

        public static SidebarItem[] GetLinksTree(SystemUser systemUser)
        {
            if (systemUser?.Permission == null) return new SidebarItem[0];

            return LinkItems
                .Select(li => li.Clone())
                .Where(li => li.UserHasPermission(systemUser.Permission))
                .Select(li => FilterAvailableItems(li, systemUser))
                .ToArray();
        }

        private static SidebarItem FilterAvailableItems(SidebarItem item, SystemUser systemUser)
        {
            for (int i = 0; i < item.InnerItems.Length; i++)
                item.InnerItems[i] = FilterAvailableItems(item.InnerItems[i], systemUser);

            SidebarItem[] innerItems = item.InnerItems.Where(li => li.UserHasPermission(systemUser.Permission)).ToArray();

            return innerItems.Any()
                ? ListGroup(item.Text, item.CssClassName, innerItems)
                : ListItem(item.Text, item.Url, item.CssClassName, item.AvailableForAccessPolicies);
        }
    }
}
