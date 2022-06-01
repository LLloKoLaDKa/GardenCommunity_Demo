using System;

namespace GC.Domain.Contacts.EmergencyContacts
{
    public class EmergencyContact
    {
        public Guid Id { get; }
        public EmergencyContactType Type { get; }
        public String CityPhone { get; }
        public String MobilePhone { get; }

        public EmergencyContact(Guid id, EmergencyContactType type, String cityPhone, String mobilePhone)
        {
            Id = id;
            Type = type;
            CityPhone = cityPhone;
            MobilePhone = mobilePhone;
        }
    }
}
