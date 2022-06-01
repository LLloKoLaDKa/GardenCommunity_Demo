using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220735)]
    public class _202205220735_createtable_appeals: MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220735_createtable_appeals");
        }
    }
}
