using System.Text.Json;

namespace GC.Tools.Json
{
    public static class JsonSerializerOptionsExtensions
    {

        public static JsonSerializerOptions AddJsonSettings(this JsonSerializerOptions options)
        {
            options.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

            return options;
        }
    }
}
