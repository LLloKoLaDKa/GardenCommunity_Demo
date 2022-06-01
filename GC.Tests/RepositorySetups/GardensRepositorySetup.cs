using GC.EntitiesCore.Context;
using GC.EntitiesCore.Repositories.Gardens;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;

namespace GC.Tests.RepositorySetups
{
    internal class GardensRepositorySetup
    {
        protected DbContextOptions<GardenContext> _contextOptions;
        protected GardensRepository _gardensRepository;

        [OneTimeSetUp]
        public void Setup()
        {
            IConfiguration configuration = new ConfigurationBuilder()
                       .AddJsonFile($"Configurations/DbConnections/connectionStrings.Tests.json")
                       .Build();

            string connectionString = configuration.GetSection("ConnectionString").Value;
            _contextOptions = new DbContextOptionsBuilder<GardenContext>().UseNpgsql(connectionString).Options;
            _gardensRepository = new GardensRepository(_contextOptions);
            _gardensRepository.DeleteAllData();
        }
    }
}
