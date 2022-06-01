using GC.Tools.DB.Mappers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Runtime.Serialization;

namespace GC.Tools.DB.Common
{
    internal static class IDataReaderExtensions
    {
        public static T GetValue<T>(this IDataReader reader, IMapper mapper)
        {
            if (reader.Read())
            {
                if (mapper is SimpleTypeMapper)
                {
                    return (T)MapperValue.GetValue(reader[0], mapper.EntityType);
                }

                return reader.MapFrom<T>(mapper as ClassMapper);
            }

            return default(T);
        }

        public static List<T> GetList<T>(this IDataReader reader, IMapper mapper, out Int64 totalRows)
        {
            totalRows = 0;

            List<T> list = new List<T>();

            if (!reader.Read()) return list;

            if (mapper is SimpleTypeMapper)
            {
                totalRows = (Int64)reader[reader.FieldCount - 1];
                list.Add((T)MapperValue.GetValue(reader[0], mapper.EntityType));

                while (reader.Read())
                {
                    list.Add((T)MapperValue.GetValue(reader[0], mapper.EntityType));
                }

                return list;
            }

            totalRows = (Int64)reader[reader.FieldCount - 1];
            list.Add(reader.MapFrom<T>(mapper as ClassMapper));

            while (reader.Read())
            {
                list.Add(reader.MapFrom<T>(mapper as ClassMapper));
            }

            return list;
        }

        public static List<T> GetList<T>(this IDataReader reader, IMapper mapper)
        {

            List<T> list = new List<T>();

            if (mapper is SimpleTypeMapper)
            {
                while (reader.Read())
                    list.Add((T)MapperValue.GetValue(reader[0], mapper.EntityType));

                return list;
            }

            while (reader.Read())
                list.Add(reader.MapFrom<T>(mapper as ClassMapper));

            return list;
        }

        public static Dictionary<TKey, TValue> GetDictionary<TKey, TValue>(this IDataReader reader)
        {
            Type keyType = typeof(TKey);
            Type valueType = typeof(TValue);

            Dictionary<TKey, TValue> dictionary = new Dictionary<TKey, TValue>();

            while (reader.Read())
            {
                dictionary.Add((TKey)MapperValue.GetValue(reader[0], keyType), (TValue)MapperValue.GetValue(reader[1], valueType));
            }

            return dictionary;
        }

        private static T MapFrom<T>(this IDataReader reader, ClassMapper classMapper)
        {

            T element = (T)FormatterServices.GetUninitializedObject(classMapper.EntityType);

            foreach (KeyValuePair<Int32, PropertyInfo> map in classMapper.Mappings(reader))
            {
                map.Value.SetValue(element, MapperValue.GetValue(reader[map.Key], map.Value.PropertyType));
            }

            return element;
        }
    }
}
