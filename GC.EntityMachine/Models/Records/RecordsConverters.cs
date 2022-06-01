using GC.Domain.Records.Ads;
using GC.Domain.Records.Novelties;
using GC.EntitiesCore.Models.Records.Ads;
using GC.EntitiesCore.Models.Records.Novelties;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Records
{
    internal static class RecordsConverters
    {
        #region Ads

        public static Ad ToAd(this AdDb db)
        {
            return new(db.Id, db.Type,  db.Title, db.Description, db.FirstName, db.MiddleName, db.LastName, db.PhoneNumber, db.PublishDate, db.Image);
        }

        public static Ad[] ToAds(this IEnumerable<AdDb> dbs)
        {
            return dbs.Select(ToAd).ToArray();
        }

        public static AdDb ToDb(this AdBlank blank, Guid? systemUserId, Boolean isPublish = false)
        {
            return new(blank.Id.Value, blank.Type.Value, blank.Title, blank.Description, blank.FirstName, blank.MiddleName, blank.LastName,
                blank.PhoneNumber,  isPublish ? blank.PublishDate.Value : null, blank.Image, systemUserId, DateTime.Now);
        }

        #endregion Ads

        #region Novelties

        public static Novelty ToNovelty(this NoveltyDb db)
        {
            return new(db.Id, db.Title, db.Description, db.PublishDate, db.Image);
        }

        public static Novelty[] ToNovelties(this IEnumerable<NoveltyDb> dbs)
        {
            return dbs.Select(ToNovelty).ToArray();
        }

        public static NoveltyDb ToDb(this NoveltyBlank blank, Guid systemUseId, Boolean isPublish = false)
        {
            return new(blank.Id.Value, blank.Title, blank.Description, isPublish ? blank.PublishDate : null, blank.Image,
                systemUseId, DateTime.Now);
        }

        #endregion Novelties
    }
}
