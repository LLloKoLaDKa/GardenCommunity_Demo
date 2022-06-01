using GC.Domain.Records.Ads;
using GC.Tools.Types.Results;
using System;

namespace GC.EntitiesCore.Repositories.Records.Ads
{
    public interface IAdsRepository
    {
        public void SaveAd(AdBlank blank, Guid? systemUserId = null, Boolean isPublish = false);
        public Ad GetLastAd();
        public Ad GetById(Guid adId);
        public PagedResult<Ad> GetAdsPaged(Int32 page, Int32 count, AdType? adType, String search);
        public Ad[] GetOfferedAds();
        public Int32 GetOfferedAdsCount();
        public Ad[] GetArchiveAds();
        public void TakeOffAd(Guid adId, Guid systemUserId);
        public void RemoveAd(Guid adId, Guid systemUserId);
    }
}
