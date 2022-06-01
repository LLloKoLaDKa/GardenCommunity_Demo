using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.Tools.DB
{
    internal static class ReflectionHelper
    {
        private static readonly Type[] SimpleTypes =
        {
            typeof(Decimal),
            typeof(String),
            typeof(Guid),
            typeof(DateTime)
        };

        public static Boolean IsSimpleType(Type type)
        {
            return type.IsEnum
                   || type.IsPrimitive
                   || SimpleTypes.Contains(type);
        }

        public static Array GetArray(this Type elementType, IReadOnlyList<Object> objects)
        {
            Array array = Array.CreateInstance(elementType, objects.Count);
            for (Int32 i = 0; i < array.Length; ++i)
                array.SetValue(objects[i], i);

            return array;
        }
    }
}
