using GC.Domain.Contacts;
using GC.Domain.Contacts.EmergencyContacts;
using GC.Domain.Contacts.ForeignContacts;
using GC.Domain.Contacts.GardenContacts;
using System;

namespace GC.EntitiesCore.Repositories.Contacts
{
    public interface IContactsRepository
    {
        #region GardenContacts

        public void SaveGardenContacts(AllContactsBlank blanks, Guid systemUserId);

        public AllContacts GetAllContacts();

        public GardenContact[] GetGardenContactsByGardenerId(Guid gardenerId);

        #endregion GardenContacts
    }
}
