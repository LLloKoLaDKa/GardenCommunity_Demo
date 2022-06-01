using System;
using System.Linq;

namespace GC.Tools.DB
{
    public static class MapperValue
    {
        public static Object GetValue(Object value, Type targetType)
        {
            if (value == DBNull.Value || value == null)
                return null;

            Type type = Nullable.GetUnderlyingType(targetType) ?? targetType;

            if (type.IsArray)
                return GetArrayOfValues(value, type);

            if (type.IsEnum)
                return Enum.ToObject(type, value);

            return Convert.ChangeType(value, type);
        }

        public static Object GetArrayOfValues(Object values, Type type)
        {
            Type elementType = type.GetElementType();

            if (elementType.IsEnum)
            {
                Object[] array = ((Array)values).Cast<Int32>().Select(x => Enum.ToObject(elementType, x)).ToArray();
                return elementType.GetArray(array);
            }

            return Convert.ChangeType(values, type);
        }
    }
}
