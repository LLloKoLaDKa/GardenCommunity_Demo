using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Gardens
{
    [Table("gd_gardeners")]
    public class GardenerDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("firstname")]
        public String FirstName { get; set; }

        [Column("middlename")]
        public String? MiddleName { get; set; }

        [Column("lastname")]
        public String LastName { get; set; }

        [Column("sectorid")]
        public Guid SectorId { get; set; }

        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        [Column("modifieduserid")]
        public Guid ModifiedUserId { get; set; }
        
        [Column("isremoved")]
        public Boolean IsRemoved { get; set; }

        public GardenerDb() { }

        public GardenerDb(Guid id, String firstName, String middleName, String lastName, Guid sectorId, DateTime modifiedDateTime,
            Guid modifiedUserId, Boolean isRemoved)
        {
            Id = id;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            SectorId = sectorId;
            ModifiedDateTime = modifiedDateTime;
            ModifiedUserId = modifiedUserId;
            IsRemoved = isRemoved;
        }
    }
}
