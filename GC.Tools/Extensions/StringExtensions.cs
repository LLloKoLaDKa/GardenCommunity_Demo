using System;

namespace GC.Tools.Extensions
{
    public static class StringExtensions
    {
        public static String ToCamelCase(this String value)
        {
            return value[0].ToString().ToLower() + value.Substring(1);
        }

        public static Boolean LowerContains(this String value, String containableValue)
        {
            if (value is null && containableValue is null) return true;
            if (value is not null && containableValue is null) return false;
            if (value is null && containableValue is not null) return false;

            return value.ToLower().Contains(containableValue.ToLower());
        }
    }
}
