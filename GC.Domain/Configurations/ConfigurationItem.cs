using System;

namespace GC.Domain.Configurations
{
    public class ConfigurationItem
    {
        public String Key { get; }
        public String Value { get; }

        public ConfigurationItem(String key, String value)
        {
            Key = key;
            Value = value;
        }
    }
}
