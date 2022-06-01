using GC.Domain.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Configurations.Converters
{
    internal static class ConfigurationsConverter
    {
        internal static ConfigurationItem ToConfiguration(this ConfigurationDb db)
        {
            return new ConfigurationItem(db.Key, db.Value);

        }

        internal static ConfigurationItem[] ToConfigurations(this IEnumerable<ConfigurationDb> dbs)
        {
            return dbs.Select(ToConfiguration).ToArray();
        }

        internal static ConfigurationDb ToConfigurationDb(this ConfigurationItemBlank configuration, Guid systemUserId)
        {
            return new ConfigurationDb(configuration.Key, configuration.Value, DateTime.Now, systemUserId);
        }
    }
}
