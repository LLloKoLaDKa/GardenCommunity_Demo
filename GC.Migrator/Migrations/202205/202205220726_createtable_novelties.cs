using FluentMigrator;
using GC.Migrator.Tools;

namespace GC.Migrator.Migrations._202205
{
    [Migration(202205220726)]
    public class _202205220726_createtable_novelties : MigrationHeart
    {
        public override void Up()
        {
            ExecuteSqlScript("202205", "202205220726_createtable_novelties");
        }
    }
}
