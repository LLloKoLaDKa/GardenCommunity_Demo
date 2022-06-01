using GC.Domain.Contacts.GardenContacts;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Contacts
{
    [Table("ct_gardencontacts")]
    public class GardenContactDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("gardenerid")]
        public Guid GardenerId { get; set; }

        [Column("type")]
        public GardenContactType Type { get; set; }

        [Column("phone")]
        public String PhoneNumber { get; set; }

        [Column("modifieduserid")]
        public Guid ModifiedUserId { get; set; }

        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        public GardenContactDb(Guid id, Guid gardenerId, GardenContactType type, String phoneNumber, Guid modifiedUserId, DateTime modifiedDateTime)
        {
            Id = id;
            GardenerId = gardenerId;
            Type = type;
            PhoneNumber = phoneNumber;
            ModifiedUserId = modifiedUserId;
            ModifiedDateTime = modifiedDateTime;
        }
    }
}
