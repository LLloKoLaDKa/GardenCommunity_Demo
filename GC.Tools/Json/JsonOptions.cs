using System.Text.Json;

namespace GC.Tools.Json
{
    public static class JsonOptions
    {
        public static JsonSerializerOptions SerializerSettings 
        {
            get
            {
                JsonSerializerOptions options = new JsonSerializerOptions();
                options.AddJsonSettings();

                return options;
            }
        }
    }
}
