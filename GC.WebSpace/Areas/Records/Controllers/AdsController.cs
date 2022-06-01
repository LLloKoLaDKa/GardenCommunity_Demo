using GC.WebSpace.Infrastructure.Filters;
using GC.Domain.AccessPolicies;
using GC.Domain.Records.Ads;
using GC.Domain.Services.Records;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GC.WebSpace.Areas.Records.Controllers
{
    [IsAuthorized(AccessPolicy.Ads_Catalog)]
    public class AdsController : BaseAuthorizedController
    {
        private readonly IAdsService _adsService;

        public AdsController(IAdsService adsService)
        {
            _adsService = adsService;
        }

        [HttpGet("/IS/Ads")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public IActionResult Index() => ReactApp("ads", "Объявления");

        [HttpPost("/IS/Ads/Save")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public async Task<Result> Save([FromBody] AdBlank adBlank)
        {
            return await _adsService.SaveAd(adBlank, SystemUser.Id);
        }

        [HttpGet("/IS/Ads/GetAdsPaged")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public PagedResult<Ad> GetAdsPaged(int page, int pageSize, AdType? adType, string search)
        {
            return _adsService.GetAdsPaged(page, pageSize, adType, search);
        }

        [HttpGet("/IS/Ads/GetOfferedAds")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public Ad[] GetOfferedAds()
        {
            return _adsService.GetOfferedAds();
        }

        [HttpGet("/IS/Ads/GetOfferedAdsCount")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public int GetOfferedAdsCount()
        {
            return _adsService.GetOfferedAdsCount();
        }

        [HttpGet("/IS/Ads/GetArchiveAds")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public Ad[] GetArchiveAds()
        {
            return _adsService.GetArchiveAds();
        }

        [HttpPost("/IS/Ads/TakeOffAd")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public Result TakeOffAd([FromBody] Guid adId)
        {
            return _adsService.TakeOffAd(adId, SystemUser.Id);
        }

        [HttpPost("/IS/Ads/Publish")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public async Task<Result> Publish([FromBody] AdBlank adBlank)
        {
            return await _adsService.SaveAd(adBlank, SystemUser.Id, isPublish: true);
        }

        [HttpPost("/IS/Ads/Remove")]
        [IsAuthorized(AccessPolicy.Ads_Catalog)]
        public Result RemoveAd([FromBody] Guid adId)
        {
            return _adsService.RemoveAd(adId, SystemUser.Id);
        }
    }
}
