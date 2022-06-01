using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220727)]
    public class _202205220727_createtable_ads : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220727_createtable_ads");
        }
    }
}
