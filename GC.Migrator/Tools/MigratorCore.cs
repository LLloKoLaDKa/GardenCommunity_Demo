using FluentMigrator.Runner;
using GC.Migrator.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace GC.Migrator.Tools
{
    public class MigratorCore
    {
        private IConfiguration Configuration { get; }

        public MigratorCore(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void StartMigrations()
        {
            var connectionString = Configuration.GetSection("ConnectionString");
            if (connectionString == null)
                throw new ArgumentNullException(nameof(connectionString));

            var serviceProvider = CreateServices(connectionString.Value);

            using (var scope = serviceProvider.CreateScope())
            {
                UpdateDatabase(scope.ServiceProvider);
            }

            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("All migrations completed");
        }

        private IServiceProvider CreateServices(string connectionString)
        {
            return new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                       .AddPostgres()
                       .WithGlobalConnectionString(connectionString)
                       .ScanIn(typeof(Program).Assembly).For.Migrations()
                       .WithVersionTable(new VersionTable()))
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);
        }

        private void UpdateDatabase(IServiceProvider serviceProvider)
        {
            IMigrationRunner runner = serviceProvider.GetRequiredService<IMigrationRunner>();
            runner.MigrateUp();
        }
    }
}
