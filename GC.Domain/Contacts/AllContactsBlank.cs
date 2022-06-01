using GC.Domain.Contacts.EmergencyContacts;
using GC.Domain.Contacts.ForeignContacts;
using GC.Domain.Contacts.GardenContacts;

namespace GC.Domain.Contacts
{
    public class AllContactsBlank
    {
        public EmergencyContactBlank[] EmergencyContacts { get; set; }
        public ForeignContactBlank[] ForeignContacts { get; set; }
        public GardenContactBlank[] GardenContacts { get; set; }
    }
}
