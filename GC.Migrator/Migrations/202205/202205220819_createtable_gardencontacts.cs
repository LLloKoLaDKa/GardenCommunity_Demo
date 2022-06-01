using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220819)]
    public class _202205220819_createtable_gardencontacts : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220819_createtable_gardencontacts");
        }
    }
}
