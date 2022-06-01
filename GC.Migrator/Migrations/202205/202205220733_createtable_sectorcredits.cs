using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220733)]
    public class _202205220733_createtable_sectorcredits : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220733_createtable_sectorcredits");
        }
    }
}
