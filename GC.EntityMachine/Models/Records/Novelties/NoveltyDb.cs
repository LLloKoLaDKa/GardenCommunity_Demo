using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Records.Novelties
{
    [Table("rd_novelties")]
    public class NoveltyDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("publishdate")]
        public DateTime? PublishDate { get; set; }

        [Column("image")]
        public string Image { get; set; }

        [Column("modifieduserid")]
        public Guid ModifiedUserId { get; set; }

        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        [Column("isremoved")]
        public bool IsRemoved { get; set; }

        public NoveltyDb(Guid id, string title, string description, DateTime? publishDate, string image,
            Guid modifiedUserId, DateTime modifiedDateTime)
        {
            Id = id;
            Title = title;
            Description = description;
            PublishDate = publishDate;
            Image = image;
            ModifiedUserId = modifiedUserId;
            ModifiedDateTime = modifiedDateTime;
        }
    }
}
