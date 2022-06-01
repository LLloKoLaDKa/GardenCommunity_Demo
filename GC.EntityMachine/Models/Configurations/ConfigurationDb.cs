using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Configurations
{
    [Table("cs_configurationsettings")]
    public class ConfigurationDb
    {
        [Key]
        [Column("key")]
        public string Key { get; set; }

        [Column("value")]
        public string Value { get; set; }

        [Column("lastmodifieddatetime")]
        public DateTime LastModifiedDateTime { get; set; }

        [Column("lastmodifieduserid")]
        public Guid LastModifiedUserId { get; set; }

        [Column("isremoved")]
        public bool IsRemoved { get; set; }

        public ConfigurationDb() { }

        public ConfigurationDb(string key, string value, DateTime lastModifiedDateTime, Guid lastModifiedUserId)
        {
            Key = key;
            Value = value;
            LastModifiedDateTime = lastModifiedDateTime;
            LastModifiedUserId = lastModifiedUserId;
        }
    }
}
