using GC.Domain.Contacts.EmergencyContacts;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Contacts
{
    [Table("ct_emergencycontacts")]
    public class EmergencyContactDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("type")]
        public EmergencyContactType Type { get; set; }

        [Column("cityphone")]
        public String? CityPhone { get; set; }

        [Column("mobilephone")]
        public String? MobilePhone { get; set; }

        [Column("modifieduserid")]
        public Guid ModifiedUserId { get; set; }

        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        public EmergencyContactDb(Guid id, EmergencyContactType type, String? cityPhone, String? mobilePhone, Guid modifiedUserId, DateTime modifiedDateTime)
        {
            Id = id;
            Type = type;
            CityPhone = cityPhone;
            MobilePhone = mobilePhone;
            ModifiedUserId = modifiedUserId;
            ModifiedDateTime = modifiedDateTime;
        }
    }
}
