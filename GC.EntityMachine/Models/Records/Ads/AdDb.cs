using GC.Domain.Records.Ads;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Records.Ads
{
    [Table("rd_ads")]
    public class AdDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("type")]
        public AdType Type { get; set; }

        [Column("title")]
        public String Title { get; set; }

        [Column("description")]
        public String Description { get; set; }

        [Column("firstname")]
        public String FirstName { get; set; }

        [Column("middlename")]
        public String? MiddleName { get; set; }

        [Column("lastname")]
        public String LastName { get; set; }

        [Column("phonenumber")]
        public String PhoneNumber { get; set; }

        [Column("publishdate")]
        public DateTime? PublishDate { get; set; }

        [Column("image")]
        public String? Image { get; set; }

        [Column("modifieduserid")]
        public Guid? ModifiedUserId { get; set; }

        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        [Column("isremoved")]
        public Boolean IsRemoved { get; set; }

        public AdDb(Guid id, AdType type, String title, String description, String firstName, String middleName, String lastName, String phoneNumber,
            DateTime? publishDate, String image, Guid? modifiedUserId, DateTime modifiedDateTime)
        {
            Id = id;
            Type = type;
            Title = title;
            Description = description;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            PublishDate = publishDate;
            Image = image;
            ModifiedUserId = modifiedUserId;
            ModifiedDateTime = modifiedDateTime;
        }
    }
}
