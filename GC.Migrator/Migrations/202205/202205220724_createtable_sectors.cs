using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220724)]
    public class _202205220724_createtable_sectors : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220724_createtable_sectors");
        }
    }
}
