using GC.WebSpace.Infrastructure.Filters;
using GC.Domain.AccessPolicies;
using GC.Domain.Gardens;
using GC.Domain.Services.Gardens;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GC.WebSpace.Areas.Gardens.Controllers
{
    public class GardenersController : BaseAuthorizedController
    {
        private readonly IGardensService _gardensService;

        public GardenersController(IGardensService gardensService)
        {
            _gardensService = gardensService;
        }

        [HttpGet("/IS/Gardeners")]
        [IsAuthorized(AccessPolicy.GardenSectors_Catalog)]
        public IActionResult Index() => ReactApp("gardeners", "Садоводы");

        [HttpPost("/IS/Gardeners/Save")]
        [IsAuthorized(AccessPolicy.Gardeners_Catalog)]
        public Result SaveGardener([FromBody] GardenerBlank gardenerBlank)
        {
            return _gardensService.SaveGardener(gardenerBlank, SystemUser.Id);
        }

        [HttpGet("/IS/Gardeners/GetAll")]
        [IsAuthorized(AccessPolicy.GardenSectors_Catalog, AccessPolicy.Contacts_Catalog)]
        public Gardener[] GetAll()
        {
            return _gardensService.GetAll();
        }

        [HttpGet("/IS/Gardeners/GetPaged")]
        [IsAuthorized(AccessPolicy.Gardeners_Catalog)]
        public PagedResult<Gardener> GetGardenersPaged(int page, int count, string search)
        {
            return _gardensService.GetGardenersPaged(page, count, search);
        }

        [HttpPost("/IS/Gardeners/Remove")]
        [IsAuthorized(AccessPolicy.Gardeners_Catalog)]
        public Result RemoveGardener([FromBody] Guid gardenerId)
        {
            return _gardensService.RemoveGardener(gardenerId, SystemUser.Id);
        }
    }
}
