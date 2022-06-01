using GC.Domain.Contacts.ForeignContacts;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models
{
    [Table("ct_foreigncontacts")]
    public class ForeignContactDb
    {
        [Column("id")]
        public Guid Id { get; set;}

        [Column("type")]
        public ForeignContactType Type { get; set;}

        [Column("firstname")]
        public String FirstName { get; set; }

        [Column("middlename")]
        public String? MiddleName { get; set; }

        [Column("lastname")]
        public String LastName { get; set; }

        [Column("phone")]
        public String PhoneNumber { get; set; }

        [Column("modifieduserid")]
        public Guid ModifiedUserId { get; set; }

        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        public ForeignContactDb(Guid id, ForeignContactType type, String firstName, String? middleName, String lastName,
            String phoneNumber, Guid modifiedUserId, DateTime modifiedDateTime)
        {
            Id = id;
            Type = type;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            ModifiedUserId = modifiedUserId;
            ModifiedDateTime = modifiedDateTime;
        }
    }
}
