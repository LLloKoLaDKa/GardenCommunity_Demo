using GC.WebSpace.Infrastructure.Filters;
using GC.Domain.AccessPolicies;
using GC.Domain.Services.Statistics;
using GC.Domain.Statistics.PageEntries;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GC.WebSpace.Areas.Statistics.Controller
{
    public class PageEntriesController : BaseAuthorizedController
    {
        private readonly IStatisticsService _statisticsService;

        public PageEntriesController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("/IS/PageEntries")]
        [IsAuthorized(AccessPolicy.PageEntries_Chart)]
        public IActionResult Index() => ReactApp("pageentries", "Статистика просмотра страниц");

        [HttpGet("/IS/Statistics/GetPageEntries")]
        [IsAuthorized(AccessPolicy.PageEntries_Chart)]
        public PageEntry[] GetPageEntries(DateTime? startDate, DateTime? endDate)
        {
            return _statisticsService.GetPageEntries(startDate, endDate);
        }
    }
}
