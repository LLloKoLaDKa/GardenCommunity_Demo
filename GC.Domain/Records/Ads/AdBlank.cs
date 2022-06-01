using GC.Domain.Persons;
using System;

namespace GC.Domain.Records.Ads
{
    public class AdBlank : FromPersonBlank
    {
        public Guid? Id { get; set; }
        public AdType? Type { get; set; }
        public String Title { get; set; }
        public String Description { get; set; }
        public String FirstName { get; set; }
        public String MiddleName { get; set; }
        public String LastName { get; set; }
        public String PhoneNumber { get; set; }
        public DateTime? PublishDate { get; set; }
        public String Image { get; set; }
    }
}
