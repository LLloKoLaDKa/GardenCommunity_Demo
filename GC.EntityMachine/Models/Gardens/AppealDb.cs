using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Gardens
{
    [Table("gd_appeals")]
    public class AppealDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("firstname")]
        public String FirstName { get; set; }

        [Column("lastname")]
        public String LastName { get; set; }

        [Column("phonenumber")]
        public String PhoneNumber { get; set; }

        [Column("title")]
        public String Title { get; set; }

        [Column("message")]
        public String Message { get; set; }

        [Column("email")]
        public String Email { get; set; }

        [Column("createddatetime")]
        public DateTime Date { get; set; }

        [Column("isviewed")]
        public Boolean IsViewed { get; set; }

        [Column("vieweduserid")]
        public Guid? ViewedUserId { get; set; }

        public AppealDb() { }

        public AppealDb(Guid id, String firstName, String lastName, String phoneNumber, String title, String message, String email,
            DateTime date, Boolean isViewed, Guid? viewedUserId = null)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            Title = title;
            Message = message;
            Email = email;
            Date = date;
            IsViewed = isViewed;
            ViewedUserId = viewedUserId;
        }
    }
}
