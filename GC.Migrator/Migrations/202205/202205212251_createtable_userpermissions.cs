using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205212251)]
    public class _202205212251_createtable_userpermissions : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205212251_createtable_userpermissions");
        }
    }
}
