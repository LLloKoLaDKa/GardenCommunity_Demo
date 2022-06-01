using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using GC.Migrator.Tools;

namespace GC.Migrator
{
    internal class Program
    {   
        private static void Main(String[] args)
        {
            args ??= new String[0];
            String environment = args.FirstOrDefault() ?? "Development";
            Boolean isTeamCity = args.Length > 1 && args[1] == "TeamCity";

            try
            {
                Console.WriteLine(environment);

                IConfiguration configuration = new ConfigurationBuilder()
                    .AddJsonFile("appsettings.json")
                    .AddJsonFile($"Configurations/DbConnections/connectionStrings.{environment}.json")
                    .Build();

                Console.Write($"\n{configuration.GetSection("ConnectionString").Value}\n");

                if (!isTeamCity)
                {
                    Console.WriteLine("Введите любой символ:");
                    Console.ReadKey();
                    Console.WriteLine();
                }

                MigratorCore migrator = new MigratorCore(configuration);
                migrator.StartMigrations();

                if (environment == "Development")
                {
                    Console.WriteLine("");
                    Console.WriteLine("Запуск миграций для базы тестирования");

                    IConfiguration testСonfiguration = new ConfigurationBuilder()
                        .AddJsonFile($"Configurations/DbConnections/connectionStrings.Tests.json")
                        .Build();

                    Console.Write($"\n{testСonfiguration.GetSection("ConnectionString").Value}\n");

                    Console.WriteLine("Введите любой символ:");
                    Console.ReadKey();
                    Console.WriteLine();

                    MigratorCore testsMigrator = new MigratorCore(testСonfiguration);
                    testsMigrator.StartMigrations();
                }

                if (!isTeamCity) Console.ReadKey();
            }
            catch(Exception exception)
            {
                Console.WriteLine($"{exception}");
                if (!isTeamCity) Console.ReadKey();

                throw;
            }
        }
    }
}
