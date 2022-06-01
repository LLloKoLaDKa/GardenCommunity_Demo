using System;
using System.Text.Json;

namespace GC.Tools.Json
{
    public static class JsonExtensions
    {
        public static String Serialize(this Object @object)
        {
            if (@object is null) return null;
            return JsonSerializer.Serialize(@object, JsonOptions.SerializerSettings);
        }

        public static T Deserialize<T>(this String @string)
        {
            if (@string is null) return default;
            return JsonSerializer.Deserialize<T>(@string, JsonOptions.SerializerSettings);
        }
    }
}
