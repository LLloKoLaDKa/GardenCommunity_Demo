using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205212252)]
    public class _202205212252_createtable_usertokens : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205212252_createtable_usertokens");
        }
    }
}
