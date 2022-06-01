using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220949)]
    public class _202205220949_createtable_foreigncontacts : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220949_createtable_foreigncontacts");
        }
    }
}
