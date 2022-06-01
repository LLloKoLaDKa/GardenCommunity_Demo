using GC.Domain.Records.Ads;
using GC.Tools.Types.Results;
using System;
using System.Threading.Tasks;

namespace GC.Domain.Services.Records
{
    public interface IAdsService
    {
        public Task<Result> SaveAd(AdBlank blank, Guid? systemUserId = null, Boolean isPublish = false);
        public Ad GetLastAd();
        public Ad GetById(Guid adId);
        public PagedResult<Ad> GetAdsPaged(Int32 page, Int32 count, AdType? adType = null, String search = "");
        public Ad[] GetOfferedAds();
        public Int32 GetOfferedAdsCount();
        public Ad[] GetArchiveAds();
        public Result TakeOffAd(Guid adId, Guid systemUserId);
        public Result RemoveAd(Guid adId, Guid systemUserId);
    }
}
