using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Gardens
{
    [Table("gd_sectorcredits")]
    public class SectorCreditDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("sectorid")]
        public Guid SectorId { get; set; }

        [Column("credit")]
        public Int32 Credit { get; set; }

        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        [Column("modifieduserid")]
        public Guid ModifiedUserId { get; set; }

        public SectorCreditDb(Guid id, Guid sectorId, Int32 credit, DateTime modifiedDateTime, Guid modifiedUserId)
        {
            Id = id;
            SectorId = sectorId;
            Credit = credit;
            ModifiedDateTime = modifiedDateTime;
            ModifiedUserId = modifiedUserId;
        }
    }
}
