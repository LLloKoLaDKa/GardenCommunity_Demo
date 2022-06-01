using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205212253)]
    public class _202205212253_createtable_photos : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205212253_createtable_photos");
        }
    }
}
