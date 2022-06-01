using GC.WebSpace.Infrastructure.Filters;
using GC.Domain.AccessPolicies;
using GC.Domain.Gardens;
using GC.Domain.Gardens.Enums;
using GC.Domain.Gardens.Sectors.Sales;
using GC.Domain.Services.Gardens;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GC.WebSpace.Areas.Gardens.Controllers
{
    [IsAuthorized(AccessPolicy.SectorSales_Catalog)]
    public class SectorSalesController : BaseAuthorizedController
    {
        private readonly IGardensService _gardensService;

        public SectorSalesController(IGardensService gardensService)
        {
            _gardensService = gardensService;
        }

        [HttpPost("/IS/SectorSales/Save")]
        [IsAuthorized(AccessPolicy.SectorSales_Catalog)]
        public Result SaveSale([FromBody] SectorSaleBlank blank)
        {
            return _gardensService.SaveSectorSale(blank, SystemUser.Id);
        }

        [HttpGet("/IS/SectorSales/GetPaged")]
        [IsAuthorized(AccessPolicy.SectorSales_Catalog)]
        public PagedResult<SectorSale> GetPaged(int page, int count, GardenStreet? street, SectorSaleSort? sort)
        {
            return _gardensService.GetSectorSalesPaged(page, count, street, sort);
        }

        [HttpPost("/IS/SectorSales/Remove")]
        [IsAuthorized(AccessPolicy.SectorSales_Catalog)]
        public Result RemoveSale([FromBody] Guid saleId)
        {
            return _gardensService.RemoveSectorSale(saleId, SystemUser.Id);
        }
    }
}
