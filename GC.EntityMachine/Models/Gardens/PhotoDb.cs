using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Gardens
{
    [Table("gd_photos")]
    public class PhotoDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("path")]
        public String Path { get; set; }

        [Column("createddatetime")]
        public DateTime CreatedDateTime { get; set; }

        [Column("createduserid")]
        public Guid CreatedUserId { get; set; }

        public PhotoDb(Guid id, String path, DateTime createdDateTime, Guid createdUserId)
        {
            Id = id;
            Path = path;
            CreatedDateTime = createdDateTime;
            CreatedUserId = createdUserId;
        }
    }
}
