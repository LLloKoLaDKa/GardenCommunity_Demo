using GC.WebSpace.Infrastructure.Filters;
using GC.WebSpace.Infrastructure.ReactApp;
using GC.Domain.AccessPolicies;
using GC.Domain.Contacts;
using GC.Domain.Services.Contacts;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace GC.WebSpace.Areas.Contacts.Controllers
{
    public class ContactsController : BaseAuthorizedController
    {
        private readonly IContactsService _contactsService;

        public ContactsController(IContactsService contactsService)
        {
            _contactsService = contactsService;
        }

        [HttpGet("/IS/Contacts")]
        [IsAuthorized(AccessPolicy.Contacts_Catalog)]
        public IActionResult Index() => ReactApp("contacts", "Контакты");

        [HttpPost("/IS/Contacts/Save")]
        [IsAuthorized(AccessPolicy.Contacts_Catalog)]
        public Result SaveContacts([FromBody] AllContactsBlank contactBlanks)
        {
            return _contactsService.SaveContacts(contactBlanks, SystemUser.Id);
        }

        [HttpGet("/IS/Contacts/GetAll")]
        [IsAuthorized(AccessPolicy.Contacts_Catalog)]
        public AllContacts GetAllContacts()
        {
            return _contactsService.GetAllContacts();
        }
    }
}
