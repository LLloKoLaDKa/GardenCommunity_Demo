using System;

namespace GC.Domain.Contacts.GardenContacts
{
    public class GardenContactBlank
    {
        public Guid? Id { get; set; }
        public Guid? GardenerId { get; set; }
        public GardenContactType? Type { get; set; }
        public String PhoneNumber { get; set; }
    }
}
