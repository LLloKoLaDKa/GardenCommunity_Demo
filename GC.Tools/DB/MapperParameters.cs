using System;
using System.Collections;
using System.Linq;

namespace GC.Tools.DB
{
    internal static class MapperParameters
    {
        public static Object GetParameterValue(Type type, Object value)
        {
            if (type.IsArray) return GetArrayOfValues(type.GetElementType(), (IList)value);

            if (type.IsEnum)
            {
                return (Int32)value;
            }

            return value;
        }

        private static Object GetArrayOfValues(Type type, IList value)
        {
            if (type.IsEnum)
            {
                return value.Cast<Int32>().ToArray();
            }

            return value;
        }
    }
}
