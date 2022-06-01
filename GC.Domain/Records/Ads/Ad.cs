using GC.Domain.Persons;
using System;

namespace GC.Domain.Records.Ads
{
    public class Ad : FromPerson
    {
        public Guid Id { get; }
        public AdType Type { get; }
        public String Title { get; }
        public String Description { get; }
        public String FirstName { get; }
        public String MiddleName { get; }
        public String LastName { get; }
        public String PhoneNumber { get; }
        public DateTime? PublishDate { get; }
        public String Image { get; }

        public Ad(Guid id, AdType type, String title, String description, String firstName, String middleName, String lastName, String phoneNumber,
            DateTime? publishDate, String image)
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
        }
    }
}
