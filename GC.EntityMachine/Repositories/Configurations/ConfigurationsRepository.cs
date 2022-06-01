using GC.Domain.Configurations;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Extensions;
using GC.EntitiesCore.Models.Configurations;
using GC.EntitiesCore.Models.Configurations.Converters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Repositories.Configurations
{
    public class ConfigurationsRepository : IConfigurationsRepository
    {
        private readonly DbContextOptions<GardenContext> _contextOptions;

        public ConfigurationsRepository(DbContextOptions<GardenContext> contextOptions)
        {
            _contextOptions = contextOptions;
        }

        public void SaveConfiguration(ConfigurationItemBlank configurationBlank, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                ConfigurationDb configurationDb = configurationBlank.ToConfigurationDb(systemUserId);

                ConfigurationDb existConfiguration = context.Configurations.FirstOrDefault(c => c.Key == configurationDb.Key);
                if (existConfiguration is null) context.Configurations.Add(configurationDb);
                else
                {
                    existConfiguration.Key = configurationDb.Key;
                    existConfiguration.Value = configurationDb.Value;
                    context.Entry(existConfiguration).State = EntityState.Modified;
                }
                context.SaveChanges();
            });
        }

        public Dictionary<string, string> GetConfigurationItems()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Configurations
                .Where(c => !c.IsRemoved)
                .OrderBy(c => c.Key)
                .ToConfigurations()
                .ToDictionary(c => c.Key, c => c.Value);
            });
        }

        public void RemoveConfiguration(string key)
        {
            _contextOptions.UseContext(context =>
            {
                ConfigurationDb configurationDb = context.Configurations.First(c => c.Key == key);
                context.Configurations.Remove(configurationDb);
                context.SaveChanges();
            });
        }
    }
}
