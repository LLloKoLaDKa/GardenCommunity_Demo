using GC.Domain.Contacts;
using GC.Domain.Contacts.GardenContacts;
using GC.Tools.Types.Results;
using System;

namespace GC.Domain.Services.Contacts
{
    public interface IContactsService
    {
        public Result SaveContacts(AllContactsBlank blanks, Guid systemUserId);
        public AllContacts GetAllContacts();

    }
}
