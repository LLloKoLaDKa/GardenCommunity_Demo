using GC.Domain.Statistics.PageEntries;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Statistics
{
    [Table("st_pageentries")]
    public class PageEntryDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("type")]
        public PageEntryType Type { get; set; }

        [Column("createddatetime")]
        public DateTime CreatedDateTime { get; set; }

        public PageEntryDb(Guid id, PageEntryType type, DateTime createdDateTime)
        {
            Id = id;
            Type = type;
            CreatedDateTime = createdDateTime;
        }
    }
}
