using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220824)]
    public class _202205220824_createtable_emergencycontacts : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220824_createtable_emergencycontacts");
        }
    }
}
