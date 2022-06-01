using FluentMigrator.Runner.VersionTableInfo;

namespace GC.Migrator.Models
{
    [VersionTableMetaData]
    class VersionTable : IVersionTableMetaData
    {
        public string ColumnName => "Version";
        public virtual string AppliedOnColumnName => "AppliedOn";
        public virtual string DescriptionColumnName => "Description";

        public object ApplicationContext { get; set; }
        public bool OwnsSchema { get; }
        public string SchemaName { get; }
        public string TableName { get; }
        public string UniqueIndexName { get; }

        public VersionTable()
        {
            TableName = $"versioninfo";
            UniqueIndexName = $"version";
            SchemaName = string.Empty;
            OwnsSchema = true;
        }
    }
}
