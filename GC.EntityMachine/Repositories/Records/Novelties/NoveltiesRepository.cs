using GC.Domain.Records.Novelties;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Extensions;
using GC.EntitiesCore.Models.Records;
using GC.EntitiesCore.Models.Records.Novelties;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace GC.EntitiesCore.Repositories.Records.Novelties
{
    public class NoveltiesRepository : INoveltiesRepository
    {
        private readonly DbContextOptions<GardenContext> _contextOptions;

        public NoveltiesRepository(DbContextOptions<GardenContext> options)
        {
            _contextOptions = options;
        }

        public void SaveNovelty(NoveltyBlank blank, Guid systemUserId, Boolean isPublish = false)
        {
            _contextOptions.UseContext(context =>
            {
                NoveltyDb db = blank.ToDb(systemUserId, isPublish);

                context.Attach(db);
                context.Novelties.AddOrUpdate(db);
                context.SaveChanges();
            });
        }

        public Novelty[] GetArchiveNovelties()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Novelties
                .Where(n => n.PublishDate == null && !n.IsRemoved)
                .OrderByDescending(a => a.ModifiedDateTime)
                .ToNovelties();
            });
        }

        public Novelty[] GetThreeLast()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Novelties
                    .Where(n => n.PublishDate != null && !n.IsRemoved)
                    .OrderByDescending(n => n.PublishDate)
                    .Take(3)
                    .ToNovelties();
            });
        }

        public Novelty GetById(Guid noveltyId)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Novelties.Where(n => !n.IsRemoved).FirstOrDefault(n => n.Id == noveltyId)?.ToNovelty();
            });
        }

        public PagedResult<Novelty> GetNoveltiesPaged(Int32 page, Int32 count, String search)
        {
            return _contextOptions.UseContext(context =>
            {
                page.GetOffset(ref page, out Int32 offset);
                NoveltyDb[] noveltyDbs = context.Novelties.Where(n => n.PublishDate != null && !n.IsRemoved).ToArray();
                if (!String.IsNullOrWhiteSpace(search)) noveltyDbs = noveltyDbs.Where(n => n.Title.LowerContains(search)).ToArray();

                Novelty[] novelties = noveltyDbs.Skip(offset).Take(count).OrderByDescending(a => a.ModifiedDateTime).ToNovelties();
                return new PagedResult<Novelty>(novelties.ToList(), noveltyDbs.Length);
            });
        }

        public void TakeOffNovelty(Guid noveltyId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                NoveltyDb? noveltyDb = context.Novelties.FirstOrDefault(a => a.Id == noveltyId && !a.IsRemoved);
                if (noveltyDb is null) return;

                noveltyDb.ModifiedUserId = systemUserId;
                noveltyDb.ModifiedDateTime = DateTime.Now;
                noveltyDb.PublishDate = null;

                context.Entry(noveltyDb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        public void RemoveNovelty(Guid noveltyId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                NoveltyDb? db = context.Novelties.FirstOrDefault(a => a.Id == noveltyId);
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
