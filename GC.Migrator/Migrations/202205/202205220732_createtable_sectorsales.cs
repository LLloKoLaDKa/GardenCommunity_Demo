using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220732)]
    public class _202205220732_createtable_sectorsales : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220732_createtable_sectorsales");
        }
    }
}
