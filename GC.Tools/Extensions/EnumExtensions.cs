using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace GC.Tools.Extensions
{
    public static class EnumExtensions
    {
        public static String GetDisplayFullName(this Enum source)
        {
            FieldInfo field = source.GetType().GetField(source.ToString());
            if (field == null) return source.ToString();

            DisplayAttribute attribute = field.GetCustomAttribute<DisplayAttribute>(false);
            if (attribute == null) return source.ToString();

            return attribute.GetName();
        }
    }
}