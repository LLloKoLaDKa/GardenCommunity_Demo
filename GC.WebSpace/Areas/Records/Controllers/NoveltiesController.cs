using GC.WebSpace.Infrastructure.Filters;
using GC.Domain.AccessPolicies;
using GC.Domain.Records.Novelties;
using GC.Domain.Services.Records;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GC.WebSpace.Areas.Records.Controllers
{
    public class NoveltiesController : BaseAuthorizedController
    {
        private readonly INoveltiesService _noveltiesService;

        public NoveltiesController(INoveltiesService noveltiesService)
        {
            _noveltiesService = noveltiesService;
        }

        [HttpGet("/IS/Novelties")]
        [IsAuthorized(AccessPolicy.Novelties_Catalog)]
        public IActionResult Index() => ReactApp("novelties", "Новости");

        [HttpPost("/IS/Novelties/Save")]
        [IsAuthorized(AccessPolicy.Novelties_Catalog)]
        public async Task<Result> SaveNovelty([FromBody] NoveltyBlank noveltyBlank)
        {
            return await _noveltiesService.SaveNovelty(noveltyBlank, SystemUser.Id);
        }

        [HttpGet("/IS/Novelties/GetArchives")]
        [IsAuthorized(AccessPolicy.Novelties_Catalog)]
        public Novelty[] GetArchives()
        {
            return _noveltiesService.GetArchiveNovelties();
        }

        [HttpGet("/IS/Novelties/GetPaged")]
        [IsAuthorized(AccessPolicy.Novelties_Catalog)]
        public PagedResult<Novelty> GetNoveltiesPaged(int page, int pageSize, string search)
        {
            return _noveltiesService.GetNoveltiesPaged(page, pageSize, search);
        }

        [HttpPost("/IS/Novelties/TakeOff")]
        [IsAuthorized(AccessPolicy.Novelties_Catalog)]
        public Result TakeOffNovelty([FromBody] Guid noveltyId)
        {
            return _noveltiesService.TakeOffNovelty(noveltyId, SystemUser.Id);
        }

        [HttpPost("/IS/Novelties/Publish")]
        [IsAuthorized(AccessPolicy.Novelties_Catalog)]
        public async Task<Result> PublishNovelty([FromBody] NoveltyBlank noveltyBlank)
        {
            return await _noveltiesService.SaveNovelty(noveltyBlank, SystemUser.Id, true);
        }

        [HttpPost("/IS/Novelties/Remove")]
        [IsAuthorized(AccessPolicy.Novelties_Catalog)]
        public Result RemoveNovelty([FromBody] Guid noveltyId)
        {
            return _noveltiesService.RemoveNovelty(noveltyId, SystemUser.Id);
        }
    }
}
