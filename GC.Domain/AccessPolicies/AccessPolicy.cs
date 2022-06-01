using GC.Domain.Users.UserAccessRoles;
using GC.Tools.Extensions;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace GC.Domain.AccessPolicies
{
    public enum AccessPolicy
    {
        #region AccessPolicies

        [Block(Block.Users)]
        [PolicyName("Политики доступа")]
        AccessPolicies = 1,

        #endregion AccessPolicies

        #region Configurations

        [Block(Block.Configurations)]
        [PolicyName("Справочник конфигураций")]
        Configurations_Catalog,

        #endregion Configurations

        #region Contacts

        [Block(Block.Contacts)]
        [PolicyName("Справоник контактов")]
        Contacts_Catalog,

        #endregion Contacts

        #region Gardens

        [Block(Block.Gardens)]
        [PolicyName("Список обращений")]
        Appeals_List,

        [Block(Block.Gardens)]
        [PolicyName("Справочник садоводов")]
        Gardeners_Catalog,

        [Block(Block.Gardens)]
        [PolicyName("Справочник участков")]
        GardenSectors_Catalog,

        [Block(Block.Gardens)]
        [PolicyName("Продажи участков")]
        SectorSales_Catalog,

        [Block(Block.Gardens)]
        [PolicyName("Задолженности участков")]
        Credits_Catalog,

        [Block(Block.Gardens)]
        [PolicyName("Справочник фотографий")]
        Photos_Catalog,

        #endregion Gardens

        #region Records

        [Block(Block.Records)]
        [PolicyName("Справочник объявлений")]
        Ads_Catalog,

        [Block(Block.Records)]
        [PolicyName("Справочник новостей")]
        Novelties_Catalog,

        #endregion Records

        #region Users

        [Block(Block.Users)]
        [PolicyName("Справочник пользователей")]
        Users_Catalog,

        #endregion Users

        #region Statistics

        [Block(Block.Statistics)]
        [PolicyName("Статистика посещения страниц сайта")]
        PageEntries_Chart,

        #endregion Users

        #region EnoughAuthorization

        [Block(Block.EnoughAuthorization)]
        [PolicyName("EnoughAuthorization")]
        EnoughAuthorization,

        #endregion EnoughAuthorization
    }

    #region Policy

    public class Policy
    {
        public String Key { get; set; }
        public String Display { get; set; }
        public String BlockKey { get; set; }
        public String BlockDisplayName { get; set; }

        public Policy() { }

        public Policy(AccessPolicy policy)
        {
            FieldInfo field = policy.GetType().GetField(policy.ToString());
            if (field == null) throw new Exception("Не удаётся определить политику авторизации");

            PolicyNameAttribute defaultAccessPolicyAttribute = field.GetCustomAttribute<PolicyNameAttribute>(false);
            if (defaultAccessPolicyAttribute is null) throw new Exception("Не удалось определить политику авторизации");

            BlockAttribute blockAttribute = field.GetCustomAttribute<BlockAttribute>(false);
            if (blockAttribute is null) throw new Exception("Не удалось определить блок для политики авторизации");

            Key = policy.Key();
            Display = defaultAccessPolicyAttribute.DisplayName;
            BlockKey = blockAttribute.Key;
            BlockDisplayName = blockAttribute.DisplayName;
        }

        public Boolean UserHasPermission(UserAccessRole userAccessRole)
        {
            if (Key == AccessPolicy.EnoughAuthorization.Key()) return true;
            return userAccessRole.AccessPolicies.Any(ap => ap.Key() == Key);
        }
    }

    #endregion Policy

    #region AccessPolicyExtensions

    public static class AccessPolicyExtensions
    {
        public static Policy Policy(this AccessPolicy policy)
        {
            Policy storedPolicy = Enum.GetValues<AccessPolicy>().Select(ap => new Policy(ap)).FirstOrDefault(p => p.Key == policy.Key());
            return new Policy(policy);
        }

        public static String Key(this AccessPolicy key) => key.ToString();
    }

    #endregion AccessPolicyExtensions

    #region DefaultAccessPolicyAttribute

    [AttributeUsage(AttributeTargets.Field)]
    internal class PolicyNameAttribute : Attribute
    {
        public String DisplayName { get; }

        internal PolicyNameAttribute(String displayName)
        {
            DisplayName = displayName;
        }
    }

    #endregion DefaultAccessPolicyAttribute

    #region Block

    public enum Block
    {   
        [Display(Name = "Политики доступа")]
        AccessPolicies,

        [Display(Name = "Конфигурации приложения")]
        Configurations,

        [Display(Name = "Контакты")]
        Contacts, 

        [Display(Name = "Садовое пространство")]
        Gardens,

        [Display(Name = "Записи")]
        Records,

        [Display(Name = "Пользователи")]
        Users,

        [Display(Name = "Статистика")]
        Statistics,

        [Display(Name = "Достаточной авторизации")]
        EnoughAuthorization,
    }

    #endregion Block

    #region BlockAttribute

    internal class BlockAttribute : Attribute
    {
        public String Key { get;}
        public String DisplayName { get;}

        public BlockAttribute(Block block)
        {
            Key = block.ToString();
            DisplayName = block.GetDisplayFullName();
        }
    }

    #endregion BlockAttribute
}
