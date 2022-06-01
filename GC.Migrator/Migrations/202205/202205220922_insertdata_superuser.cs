using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220922)]
    public class _202205220922_insertdata_superuser : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220922_insertdata_superuser");
        }

    }
}
