using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220725)]
    public class _202205220725_createtable_gardeners : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220725_createtable_gardeners");
        }
    }
}
