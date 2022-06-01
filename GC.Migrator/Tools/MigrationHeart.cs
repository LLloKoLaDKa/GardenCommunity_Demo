using FluentMigrator;
using System;
using System.IO;

namespace GC.Migrator.Tools
{
    public abstract class MigrationHeart : Migration
    {
        protected void ExecuteSqlScript(string folder, string scriptName)
        {
            var scriptPath = $"{AppDomain.CurrentDomain.BaseDirectory}\\Migrations\\{folder}\\SqlScripts\\{scriptName}.sql";
            Console.WriteLine(scriptPath);

            try
            {
                Execute.Script(scriptPath);
            }
            catch (Exception ex)
            {
                Console.WriteLine(scriptPath);
                Console.WriteLine(ex.StackTrace);

                throw;
            }
        }

        public override void Down() => throw new NotImplementedException();
    }
}
