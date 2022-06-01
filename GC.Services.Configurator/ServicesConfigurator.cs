using GC.Configurator.Configurations;
using GC.Domain.AccessPolicies;
using GC.Domain.Services.Contacts;
using GC.Domain.Services.Gardens;
using GC.Domain.Services.Records;
using GC.Domain.Services.Statistics;
using GC.Domain.Services.Users;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Repositories.Configurations;
using GC.EntitiesCore.Repositories.Contacts;
using GC.EntitiesCore.Repositories.Gardens;
using GC.EntitiesCore.Repositories.Records.Ads;
using GC.EntitiesCore.Repositories.Records.Novelties;
using GC.EntitiesCore.Repositories.Statistics;
using GC.EntitiesCore.Repositories.Users;
using GC.Services.Contacts;
using GC.Services.Gardens;
using GC.Services.Records;
using GC.Services.Statistics;
using GC.Services.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace GC.Services.Configurator
{
    public static class ServicesConfigurator
    {
        public static void Initialize(this IServiceCollection services, IConfiguration configuration)
        {
            String connectionString = configuration.GetSection("ConnectionString").Value;
            String environment = configuration.GetSection("Environment").Value;

            DbContextOptions<GardenContext> contextOptions = new DbContextOptionsBuilder<GardenContext>().UseNpgsql(connectionString, builder =>
            {
                builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
            }).Options;
            services.AddSingleton(contextOptions);
            services.AddSingleton(configuration);

            #region Services

            services.AddSingleton<IAdsService, AdsService>();
            services.AddSingleton<IGardensService, GardensService>();
            services.AddSingleton<INoveltiesService, NoveltiesService>();
            services.AddSingleton<IUsersService, UsersService>();
            services.AddSingleton<IContactsService, ContactsService>();
            services.AddSingleton<IStatisticsService, StatisticsService>();

            #endregion

            #region Repositories

            services.AddSingleton<IAdsRepository, AdsRepository>();
            services.AddSingleton<IConfigurationsRepository, ConfigurationsRepository>();
            services.AddSingleton<IGardensRepository, GardensRepository>();
            services.AddSingleton<INoveltiesRepository, NoveltiesRepository>();
            services.AddSingleton<IUsersRepository, UsersRepository>();
            services.AddSingleton<IContactsRepository, ContactsRepository>();
            services.AddSingleton<IStatisticsRepository, StatisticsRepository>();

            #endregion

            ServiceProvider _provider = services.BuildServiceProvider();
            Configuration.Initialize(environment, _provider.GetService<IConfigurationsRepository>());
            UserAccessRolesStorage.Initialize(_provider.GetService<IUsersService>());

            #region Check

            String[] checkAssemblies =
            {
                "GC.WebSpace",
                "GC.Services"
            };

            foreach (var service in services)
            {

                var serviceAssemblyName = service.ServiceType.Assembly.GetName().Name;

                if (checkAssemblies.Contains(serviceAssemblyName))
                    _provider.GetService(service.ServiceType);
            }

            #endregion
        }
    }
}
