using GC.Domain.Services.Gardens;
using GC.EntitiesCore.Repositories.Contacts;
using GC.EntitiesCore.Repositories.Gardens;
using Microsoft.AspNetCore.Hosting;

namespace GC.Services.Gardens
{
    public partial class GardensService : IGardensService
    {
        private readonly IGardensRepository _gardensRepository;
        private readonly IContactsRepository _contactsRepository;
        private readonly IHostingEnvironment _hostingEnvironment;

        public GardensService(IGardensRepository gardensRepository, IContactsRepository contactsRepository, IHostingEnvironment hostingEnvironment)
        {
            _gardensRepository = gardensRepository;
            _contactsRepository = contactsRepository;
            _hostingEnvironment = hostingEnvironment;
        }
    }
}
