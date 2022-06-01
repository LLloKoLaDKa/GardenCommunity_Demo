using GC.Domain.Contacts;
using GC.Domain.Contacts.EmergencyContacts;
using GC.Domain.Contacts.ForeignContacts;
using GC.Domain.Contacts.GardenContacts;
using GC.Domain.Services.Contacts;
using GC.EntitiesCore.Repositories.Contacts;
using GC.Tools.Types.Results;
using System;

namespace GC.Services.Contacts
{
    public class ContactsService : IContactsService
    {
        private readonly IContactsRepository _contactsRepository;

        public ContactsService(IContactsRepository contactsRepository)
        {
            _contactsRepository = contactsRepository;
        }

        #region GardenContacts

        public Result SaveContacts(AllContactsBlank blanks, Guid systemUserId)
        {
            foreach (EmergencyContactBlank blank in blanks.EmergencyContacts)
            {
                if (blank.Id is null) blank.Id = Guid.NewGuid();
                if (String.IsNullOrWhiteSpace(blank.CityPhone) && String.IsNullOrWhiteSpace(blank.MobilePhone))
                    return Result.Fail($"Необходимо ввести хотя бы один номер телефона у '{blank.Type.Value.GetDisplayName()}'");
            }

            foreach (ForeignContactBlank foreignContact in blanks.ForeignContacts)
            {
                if (foreignContact.Id is null) foreignContact.Id = Guid.NewGuid();
                if (String.IsNullOrWhiteSpace(foreignContact.FirstName))
                    return Result.Fail($"Введите имя у '{foreignContact.Type.Value.GetDisplayName()}'");

                if (String.IsNullOrWhiteSpace(foreignContact.LastName))
                    return Result.Fail($"Введите фамилию у '{foreignContact.Type.Value.GetDisplayName()}'");

                if (String.IsNullOrWhiteSpace(foreignContact.PhoneNumber))
                    return Result.Fail($"Введите номер телефона у '{foreignContact.Type.Value.GetDisplayName()}'");

                if (String.IsNullOrWhiteSpace(foreignContact.PhoneNumber))
                    return Result.Fail($"Введите номер телефона у '{foreignContact.Type.Value.GetDisplayName()}'");
            }

            foreach (GardenContactBlank gardenContact in blanks.GardenContacts)
            {
                if (gardenContact.Id is null) gardenContact.Id = Guid.NewGuid();
                if (gardenContact.GardenerId is null) return Result.Fail("Укажите садовода");
                if (String.IsNullOrWhiteSpace(gardenContact.PhoneNumber))
                    return Result.Fail($"У одного из контактов '{gardenContact.Type.Value.GetDisplayName()}' не введён номер телефона");
            }

            _contactsRepository.SaveGardenContacts(blanks, systemUserId);
            return Result.Success();
        }

        public AllContacts GetAllContacts()
        {
            return _contactsRepository.GetAllContacts();
        }

        #endregion GardenContacts
    }
}
