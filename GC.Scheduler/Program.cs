using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using GC.Services.Configurator;
using System;
using System.Linq;

namespace GC.Scheduler
{
    class Program
    {
        private static readonly ServiceCollection Services = new ServiceCollection();
        static void Main(String[] args)
        {
            args ??= new String[0];
            String environment = args.FirstOrDefault() ?? "Development";

            Console.WriteLine("");
            Console.WriteLine($"Environment: {environment}");
            Console.WriteLine("");

            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile($"Configurations/DbConnections/connectionStrings.{environment}.json")
                .Build();

            Services.Initialize(configuration);

            JobScheduler.StartAsync(Services).GetAwaiter().GetResult();
            Console.Read();
        }
    }
}
