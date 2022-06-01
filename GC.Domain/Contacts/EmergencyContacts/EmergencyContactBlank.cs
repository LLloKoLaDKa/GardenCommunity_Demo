using System;

namespace GC.Domain.Contacts.EmergencyContacts
{
    public class EmergencyContactBlank
    {
        public Guid? Id { get; set; }
        public EmergencyContactType? Type { get; set; }
        public String? CityPhone { get; set; }
        public String? MobilePhone { get; set; }
    }
}
