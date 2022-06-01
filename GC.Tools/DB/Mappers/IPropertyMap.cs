using GC.Tools.DB.Enums;
using System;
using System.Reflection;

namespace GC.Tools.DB.Mappers
{
    internal interface IPropertyMap
    {
        String Name { get; }
        String ColumnName { get; }
        Boolean IsReadOnly { get; }
        Boolean IgnoreOnUpdate { get; }
        Boolean UpdateOnRemove { get; }
        KeyType KeyType { get; }
        PropertyInfo PropertyInfo { get; }
    }
}
