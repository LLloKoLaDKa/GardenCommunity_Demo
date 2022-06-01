using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205212250)]
    public class _202205212250_createtable_users : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205212250_createtable_users");
        }
    }
}
