using GC.WebSpace.Infrastructure.Filters;
using GC.Domain.AccessPolicies;
using GC.Domain.Gardens.Appeals;
using GC.Domain.Services.Gardens;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GC.WebSpace.Areas.Gardens.Controllers
{
    public class AppealsController : BaseAuthorizedController
    {
        private readonly IGardensService _gardensService;

        public AppealsController(IGardensService gardensService)
        {
            _gardensService = gardensService;
        }

        [HttpGet("/IS/Appeals")]
        [IsAuthorized(AccessPolicy.Appeals_List)]
        public IActionResult Index() => ReactApp("appeals", "Обращения");

        [HttpGet("/IS/Appeals/GetPaged")]
        [IsAuthorized(AccessPolicy.Appeals_List)]
        public PagedResult<Appeal> GetAppealsPaged(int page, int pageSize, DateTime? startDate, DateTime? endDate, string search)
        {
            return _gardensService.GetAppealsPaged(page, pageSize, startDate, endDate, search);
        }

        [HttpPost("/IS/Appeals/SetViewed")]
        [IsAuthorized(AccessPolicy.Appeals_List)]
        public void SetViewed([FromBody] Guid appealId)
        {
            _gardensService.SetViewed(appealId, SystemUser.Id);
        }
    }
}
