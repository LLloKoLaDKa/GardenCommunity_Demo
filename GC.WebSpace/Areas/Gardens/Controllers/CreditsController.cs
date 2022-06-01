using GC.WebSpace.Infrastructure.Filters;
using GC.Domain.AccessPolicies;
using GC.Domain.Gardens.Enums;
using GC.Domain.Gardens.Sectors.Credits;
using GC.Domain.Services.Gardens;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GC.WebSpace.Areas.Gardens.Controllers
{
    public class CreditsController : BaseAuthorizedController
    {
        private readonly IGardensService _gardensService;

        public CreditsController(IGardensService gardensService)
        {
            _gardensService = gardensService;
        }

        [HttpGet("/IS/Credits")]
        [IsAuthorized(AccessPolicy.Credits_Catalog)]
        public IActionResult Index() => ReactApp("credits", "Задолженности");

        [HttpPost("/IS/Credits/Save")]
        [IsAuthorized(AccessPolicy.Credits_Catalog)]
        public Result SaveCredit([FromBody] SectorCreditBlank creditBlank)
        {
            return _gardensService.SaveCredit(creditBlank, SystemUser.Id);
        }

        [HttpPost("/IS/Credits/TryRenderReport")]
        [IsAuthorized(AccessPolicy.Credits_Catalog)]
        public Result TryRenderReport()
        {
            return _gardensService.TryRenderReport();
        }

        [HttpGet("/IS/Credits/GetPaged")]
        [IsAuthorized(AccessPolicy.Credits_Catalog)]
        public PagedResult<SectorCredit> GetCreditsPaged(int page, int count, int? sectorNumber, SectorCreditSort? sort)
        {
            return _gardensService.GetCreditsPaged(page, count, sectorNumber, sort);
        }
    }
}
