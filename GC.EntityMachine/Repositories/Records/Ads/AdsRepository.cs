using GC.Domain.Records.Ads;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Extensions;
using GC.EntitiesCore.Models.Records;
using GC.EntitiesCore.Models.Records.Ads;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace GC.EntitiesCore.Repositories.Records.Ads
{
    public class AdsRepository : IAdsRepository
    {
        private readonly DbContextOptions<GardenContext> _contextOptions;

        public AdsRepository(DbContextOptions<GardenContext> contextOptions)
        {
            _contextOptions = contextOptions;
        }

        public void SaveAd(AdBlank blank, Guid? systemUserId = null, Boolean isPublish = false)
        {
            _contextOptions.UseContext(context =>
            {
                AdDb adDb = blank.ToDb(systemUserId, isPublish);

                context.Attach(adDb);
                context.Ads.AddOrUpdate(adDb);
                context.SaveChanges();
            });
        }

        public Ad GetLastAd()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Ads.FirstOrDefault()?.ToAd();
            });
        }

        public Ad GetById(Guid adId)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Ads.FirstOrDefault(a => a.Id == adId)?.ToAd();
            });
        }

        public PagedResult<Ad> GetAdsPaged(Int32 page, Int32 count, AdType? adType, String search)
        {
            return _contextOptions.UseContext(context =>
            {
                page.GetOffset(ref count, out Int32 offset);
                AdDb[] adDbs = context.Ads.Where(a => a.PublishDate != null && !a.IsRemoved).ToArray();
                if (adType is not null) adDbs = adDbs.Where(a => a.Type == adType).ToArray();
                if (!String.IsNullOrWhiteSpace(search)) adDbs = adDbs.Where(a => a.Title.LowerContains(search)).ToArray();

                Ad[] ads = adDbs.Skip(offset).Take(count).OrderByDescending(a => a.ModifiedDateTime).ToAds();
                return new PagedResult<Ad>(ads.ToList(), adDbs.Length);
            });
        }

        public Ad[] GetOfferedAds()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Ads
                    .Where(a => a.Type == AdType.Offered && a.PublishDate == null && !a.IsRemoved)
                    .OrderByDescending(a => a.ModifiedDateTime)
                    .ToAds();
            });
        }

        public Int32 GetOfferedAdsCount()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Ads.Where(a => a.Type == AdType.Offered && a.PublishDate == null && !a.IsRemoved).Count();
            });
        }
        

        public Ad[] GetArchiveAds()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Ads
                    .Where(a => a.Type == AdType.SelfWritten && a.PublishDate == null && !a.IsRemoved)
                    .OrderByDescending(a => a.ModifiedDateTime)
                    .ToAds();
            });
        }

        public void TakeOffAd(Guid adId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                AdDb adDb = context.Ads.FirstOrDefault(a => a.Id == adId && !a.IsRemoved);
                if (adDb is null) return;

                adDb.ModifiedUserId = systemUserId;
                adDb.ModifiedDateTime = DateTime.Now;
                adDb.PublishDate = null;

                context.Entry(adDb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        public void RemoveAd(Guid adId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                AdDb? db = context.Ads.FirstOrDefault(a => a.Id == adId);
                if (db is null) return;

                db.ModifiedDateTime = DateTime.UtcNow;
                db.ModifiedUserId = systemUserId;
                db.IsRemoved = true;

                context.Entry(db).State = EntityState.Modified;
                context.SaveChanges();
            });
        }
    }
}
