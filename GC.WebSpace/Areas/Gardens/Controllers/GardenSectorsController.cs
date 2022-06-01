using GC.WebSpace.Infrastructure.Filters;
using GC.Configurator.Configurations;
using GC.Domain.AccessPolicies;
using GC.Domain.Gardens;
using GC.Domain.Gardens.Sectors;
using GC.Domain.Services.Gardens;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GC.WebSpace.Areas.Gardens.Controllers
{
    public class GardenSectorsController : BaseAuthorizedController
    {
        private readonly IGardensService _gardensService;

        public GardenSectorsController(IGardensService gardensService)
        {
            _gardensService = gardensService;
        }

        [HttpGet("/IS/GardenSectors")]
        [IsAuthorized(AccessPolicy.GardenSectors_Catalog)]
        public IActionResult Index() => ReactApp("sectors", "Садовые участки",
            payload: new GardenContributions(Configuration.Contributions.MemberContribution, Configuration.Contributions.TargetContribution));

        [HttpPost("/IS/GardenSectors/Save")]
        [IsAuthorized(AccessPolicy.GardenSectors_Catalog)]
        public Result SaveGardenSector([FromBody] GardenSectorBlank sectorBlank)
        {
            return _gardensService.SaveGardenSector(sectorBlank, SystemUser.Id);
        }

        [HttpGet("/IS/GardenSectors/GetAll")]
        [IsAuthorized(AccessPolicy.GardenSectors_Catalog, AccessPolicy.Contacts_Catalog, AccessPolicy.Gardeners_Catalog)]
        public GardenSector[] GetAllSectors()
        {
            return _gardensService.GetAllSectors();
        }

        [HttpGet("/IS/GardenSectors/GetPaged")]
        [IsAuthorized(AccessPolicy.GardenSectors_Catalog)]
        public PagedResult<GardenSector> GetGardenersPaged(int page, int count, GardenStreet? street, int? sectorNumber)
        {
            return _gardensService.GetGardenSectorPaged(page, count, street, sectorNumber);
        }

        [HttpPost("/IS/GardenSectors/Remove")]
        [IsAuthorized(AccessPolicy.GardenSectors_Catalog)]
        public Result RemoveGardener([FromBody] Guid sectorId)
        {
            return _gardensService.RemoveGardenSector(sectorId, SystemUser.Id);
        }

        private record GardenContributions(int memberContribution, int targetContribution);
    }
}
