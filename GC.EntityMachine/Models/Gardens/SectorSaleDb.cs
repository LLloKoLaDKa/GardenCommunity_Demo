using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Gardens
{
    [Table("gd_sectorsales")]
    public class SectorSaleDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("sectorid")]
        public Guid SectorId { get; set; }

        [Column("firstname")]
        public String FirstName { get; set; }

        [Column("lastname")]
        public String LastName { get; set; }

        [Column("middlename")]
        public String MiddleName { get; set; }

        [Column("description")]
        public String Description { get; set; }

        [Column("price")]
        public Int32 Price { get; set; }

        [Column("phonenumber")]
        public String PhoneNumber { get; set; }

        [Column("publishdate")]
        public DateTime PublishDate { get; set; }

        [Column("modifieduserid")]
        public Guid ModifiedUserId { get; set; }

        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        [Column("isremoved")]
        public Boolean IsRemoved { get; set; }

        public SectorSaleDb(Guid id, Guid sectorId, String firstName, String lastName, String middleName, String description,Int32 price, String phoneNumber, DateTime publishDate,
            Guid modifiedUserId, DateTime modifiedDateTime, Boolean isRemoved)
        {
            Id = id;
            SectorId = sectorId;
            FirstName = firstName;
            LastName = lastName;
            MiddleName = middleName;
            Description = description;
            Price = price;
            PhoneNumber = phoneNumber;
            PublishDate = publishDate;
            ModifiedUserId = modifiedUserId;
            ModifiedDateTime = modifiedDateTime;
            IsRemoved = isRemoved;
        }
    }
}
