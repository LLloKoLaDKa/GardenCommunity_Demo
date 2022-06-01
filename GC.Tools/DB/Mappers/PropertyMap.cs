using GC.Tools.DB.Attributes;
using GC.Tools.DB.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace GC.Tools.DB.Mappers
{
    internal class PropertyMap : IPropertyMap
    {
        public String Name => PropertyInfo.Name;

        public String ColumnName { get; }

        public Boolean IsReadOnly { get; }

        public Boolean IgnoreOnUpdate { get; }

        public Boolean UpdateOnRemove { get; }

        public KeyType KeyType { get; }

        public PropertyInfo PropertyInfo { get; }


        public PropertyMap(PropertyInfo propertyInfo)
        {
            PropertyInfo = propertyInfo;

            ColumnName = PropertyInfo.GetCustomAttribute<ColumnAttribute>()?.Name?.ToLower() ?? propertyInfo.Name.ToLower();
            IsReadOnly = PropertyInfo.GetCustomAttribute<IsReadOnlyAttribute>() != null;
            IgnoreOnUpdate = propertyInfo.GetCustomAttribute<IgnoreOnUpdateAttribute>() != null;
            UpdateOnRemove = propertyInfo.GetCustomAttribute<UpdateOnRemoveAttribute>() != null;
            IdentifierAttribute identifierAttribute = PropertyInfo.GetCustomAttribute<IdentifierAttribute>();

            if (IsReadOnly && identifierAttribute != null)
            {
                throw new ArgumentException($"Property {Name} is readOnly");
            }

            KeyType = identifierAttribute != null ? KeyType.Identity : KeyType.NotAKey;
        }
    }
}

