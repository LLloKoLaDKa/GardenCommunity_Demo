using GC.Domain.Contacts.EmergencyContacts;
using GC.Domain.Contacts.ForeignContacts;
using GC.Domain.Contacts.GardenContacts;

namespace GC.Domain.Contacts
{
    public class AllContacts
    {
        public EmergencyContact[] EmergencyContacts { get; }
        public ForeignContact[] ForeignContacts { get; }
        public GardenContact[] GardenContacts { get; }

        public AllContacts(EmergencyContact[] emergencyContacts, ForeignContact[] foreignContacts, GardenContact[] gardenContacts)
        {
            EmergencyContacts = emergencyContacts;
            ForeignContacts = foreignContacts;
            GardenContacts = gardenContacts;
        }
    }
}
