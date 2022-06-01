using GC.Domain.Configurations;
using System;
using System.Collections.Generic;

namespace GC.EntitiesCore.Repositories.Configurations
{
    public interface IConfigurationsRepository
    {
        public void SaveConfiguration(ConfigurationItemBlank configurationItemBlank, Guid systemUserId);
        public Dictionary<string, string> GetConfigurationItems();
        public void RemoveConfiguration(string key);
    }
}
