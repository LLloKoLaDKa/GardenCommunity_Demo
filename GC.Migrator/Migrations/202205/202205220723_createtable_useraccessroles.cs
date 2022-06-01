using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220723)]
    public  class _202205220723_createtable_useraccessroles : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220723_createtable_useraccessroles");
        }
    }
}
