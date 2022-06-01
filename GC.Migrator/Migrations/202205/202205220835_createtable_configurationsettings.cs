using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220835)]
    public class _202205220835_createtable_configurationsettings : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220835_createtable_configurationsettings");
        }
    }
}
