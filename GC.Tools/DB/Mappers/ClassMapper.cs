using GC.Tools.DB.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Reflection;

namespace GC.Tools.DB.Mappers
{
    class ClassMapper : IMapper
    {
        public String TableName { get; }

        public MapperType Type => MapperType.Class;

        public Type EntityType { get; }

        public IPropertyMap[] Properties { get; }

        public ClassMapper(Type type)
        {
            EntityType = type;
            TableName = type.GetCustomAttribute<TableAttribute>()?.Name;
            PropertyInfo[] properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

            if (properties.Length == 0)
            {
                throw new ArgumentException("Count properties = 0");
            }

            Properties = properties.Select(property => new PropertyMap(property)).ToArray();
        }

        public Dictionary<Int32, PropertyInfo> Mappings(IDataRecord record)
        {
            IEnumerable<Int32> columns = Enumerable.Range(0, record.FieldCount);
            var properties = Properties
                .Select(x => new
                {
                    name = x.ColumnName,
                    prop = x.PropertyInfo
                });
            return columns
                .Join(properties, record.GetName, x => x.name, (index, x) => new
                {
                    index,
                    prop = !x.prop.CanWrite ? null : x.prop
                }, StringComparer.InvariantCultureIgnoreCase)
                .Where(x => x.prop != null) // only settable properties accounted for
                .ToDictionary(x => x.index, x => x.prop);
        }
    }
}
