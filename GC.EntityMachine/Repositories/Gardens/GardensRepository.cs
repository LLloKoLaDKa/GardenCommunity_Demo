using GC.Domain.Gardens;
using GC.Domain.Gardens.Appeals;
using GC.Domain.Gardens.Enums;
using GC.Domain.Gardens.Photos;
using GC.Domain.Gardens.Sectors;
using GC.Domain.Gardens.Sectors.Credits;
using GC.Domain.Gardens.Sectors.Sales;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Extensions;
using GC.EntitiesCore.Models.Gardens;
using GC.EntitiesCore.Models.Gardens.Converters;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace GC.EntitiesCore.Repositories.Gardens
{
    public class GardensRepository : IGardensRepository
    {
        private readonly DbContextOptions<GardenContext> _contextOptions;

        public GardensRepository(DbContextOptions<GardenContext> contextOptions)
        {
            _contextOptions = contextOptions;
        }


        #region Appears

        public void SaveAppeal(AppealBlank appealBlank)
        {
            _contextOptions.UseContext(context =>
            {
                AppealDb db = appealBlank.ToDb();

                context.Attach(db);
                context.Appeals.Add(db);
                context.SaveChanges();
            });
        }

        public PagedResult<Appeal> GetAppealsPaged(Int32 page, Int32 count, DateTime? startDate, DateTime? endDate, String? search)
        {
            return _contextOptions.UseContext(context =>
            {
                page.GetOffset(ref count, out Int32 offset);

                AppealDb[] appealDbs = context.Appeals.ToArray();
                if (startDate != null) appealDbs = appealDbs.Where(a => a.Date >= startDate).ToArray();
                if (endDate != null)
                {
                    endDate = new DateTime(endDate.Value.Year, endDate.Value.Month, endDate.Value.Day, 23, 59, 59);
                    appealDbs = appealDbs.Where(a => a.Date <= endDate.Value).ToArray();
                }
                if (!String.IsNullOrWhiteSpace(search)) appealDbs =
                    appealDbs.Where(a => a.FirstName.ToLower().Contains(search.ToLower()) || a.LastName.ToLower().Contains(search.ToLower())).ToArray();

                Appeal[] appeals = appealDbs.Skip(offset).Take(count).OrderByDescending(a => a.Date).ToAppeals();

                return new PagedResult<Appeal>(appeals, appealDbs.Count());
            });
        }

        public void SetViewed(Guid appealId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                AppealDb db = context.Appeals.FirstOrDefault(a => a.Id == appealId);
                if (db is null) return;

                context.Attach(db);
                db.IsViewed = true;
                db.ViewedUserId = systemUserId;

                context.Appeals.Update(db);
                context.SaveChanges();
            });
        }

        #endregion Appears

        #region Gardeners

        public void SaveGardener(GardenerBlank gardenerBlank, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                GardenerDb gardenerDb = gardenerBlank.ToGardenerDb(systemUserId);

                context.Attach(gardenerDb);
                context.Gardeners.AddOrUpdate(gardenerDb);
                context.SaveChanges();
            });
        }

        public Gardener[] GetAllGardeners()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Gardeners.Where(g => !g.IsRemoved).OrderBy(o => o.LastName).ToGardeners();
            });
        }

        public Gardener[] GetGardeners(Guid[] gardenerIds)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Gardeners.Where(g => gardenerIds.Contains(g.Id) && !g.IsRemoved).OrderBy(g => g.LastName).ToGardeners();
            });
        }

        public PagedResult<Gardener> GetGardenersPaged(Int32 page, Int32 count, String search)
        {
            return _contextOptions.UseContext(context =>
            {
                page.GetOffset(ref count, out Int32 offset);

                GardenerDb[] gardenDbs = context.Gardeners.Where(u => !u.IsRemoved).ToArray();
                if (!String.IsNullOrWhiteSpace(search))
                {
                    gardenDbs = gardenDbs.Where(g =>
                        g.FirstName.LowerContains(search)
                        || g.LastName.LowerContains(search)
                        || g.MiddleName.LowerContains(search)
                    ).ToArray();

                }

                Gardener[] gardeners = gardenDbs.OrderBy(u => u.LastName).Skip(offset).Take(count).ToGardeners();
                return new PagedResult<Gardener>(gardeners.ToList(), gardenDbs.Length);
            });
        }

        public void RemoveGardener(Guid gardenerId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                GardenerDb? gardenerDb = context.Gardeners.FirstOrDefault(g => g.Id == gardenerId);
                if (gardenerDb is null) return;

                gardenerDb.ModifiedUserId = systemUserId;
                gardenerDb.ModifiedDateTime = DateTime.Now;
                gardenerDb.IsRemoved = true;

                context.Entry(gardenerDb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        #endregion Gardeners

        #region GardenSectors

        public void SaveGardenSector(GardenSectorBlank sectorBlank, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                GardenSectorDb sectorDb = sectorBlank.ToGardenSectorDb(systemUserId);

                context.Attach(sectorDb);
                context.GardenSectors.AddOrUpdate(sectorDb);
                context.SaveChanges();
            });
        }

        public GardenSector GetGardenSectorByNumber(Int32 sectorNumber)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.GardenSectors.FirstOrDefault(gs => gs.SectorNumber == sectorNumber).ToGardenSector();
            });
        }

        public GardenSector[] GetGardenSectorsByIds(Guid[] ids)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.GardenSectors.Where(gs => ids.Contains(gs.Id) && !gs.IsRemoved).OrderBy(s => s.SectorNumber).ToGardenSectors();
            });
        }

        public GardenSector[] GetAllSectors()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.GardenSectors.Where(gs => !gs.IsRemoved).OrderBy(s => s.SectorNumber).ToGardenSectors();
            });
        }

        public PagedResult<GardenSector> GetGardenSectorsPaged(Int32 page, Int32 count, GardenStreet? street, Int32? sectorNumber)
        {
            return _contextOptions.UseContext(context =>
            {
                page.GetOffset(ref count, out Int32 offset);

                GardenSectorDb[] sectorDbs = context.GardenSectors.Where(u => !u.IsRemoved).ToArray();
                if (street is not null) sectorDbs = sectorDbs.Where(s => street.Value.ContainSectorNumber(s.SectorNumber)).ToArray();
                if (sectorNumber is not null) sectorDbs = sectorDbs.Where(s => s.SectorNumber == sectorNumber).ToArray();

                GardenSector[] sectors = sectorDbs.OrderBy(u => u.SectorNumber).Skip(offset).Take(count).ToGardenSectors();
                return new PagedResult<GardenSector>(sectors.ToList(), sectorDbs.Count());
            });
        }

        public void RemoveGardenSector(Guid sectorId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                GardenSectorDb sectorDb = context.GardenSectors.FirstOrDefault(gs => gs.Id == sectorId);
                if (sectorDb is null) return;

                sectorDb.ModifiedUserId = systemUserId;
                sectorDb.ModifiedDateTime = DateTime.Now;
                sectorDb.IsRemoved = true;

                context.Entry(sectorDb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        #endregion GardenSectors

        #region SectorSales

        public void SaveSectorSale(SectorSaleBlank blank, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                SectorSaleDb db = blank.ToDb(systemUserId);

                context.Attach(db);
                context.SectorSales.AddOrUpdate(db);
                context.SaveChanges();
            });
        }

        public PagedResult<SectorSale> GetSectorSalesPaged(Int32 page, Int32 count, GardenStreet? street, SectorSaleSort? sort)
        {
            return _contextOptions.UseContext(context =>
            {
                page.GetOffset(ref count, out Int32 offset);

                SectorSaleDb[] saleDbs = context.SectorSales.Where(ss => !ss.IsRemoved).ToArray();
                Guid[] sectorsIds = saleDbs.Select(ss => ss.SectorId).ToArray();
                GardenSector[] sectors = context.GardenSectors.ToGardenSectors();

                if (street is not null) sectors = sectors.Where(s => street.Value.ContainSectorNumber(s.SectorNumber)).ToArray();
                SectorSale[] sales = saleDbs
                    .Where(s => sectors.Any(sect => sect.Id == s.SectorId))
                    .Skip(offset)
                    .Take(count)
                    .ToSectorSales(sectors)
                    .OrderBy(s => s.Sector.SectorNumber)
                    .ToArray();

                if (sort != null)
                {
                    sales = sort switch
                    {
                        SectorSaleSort.PriceAscending => sales.OrderBy(s => s.Price).ToArray(),
                        SectorSaleSort.PriceDescending => sales.OrderByDescending(s => s.Price).ToArray(),
                        _ => throw new Exception()
                    };
                }

                Int32 total = context.SectorSales.Where(ss => !ss.IsRemoved).Count();

                return new PagedResult<SectorSale>(sales.ToList(), total);
            });
        }

        public void RemoveSectorSale(Guid saleId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                SectorSaleDb db = context.SectorSales.FirstOrDefault(ss => ss.Id == saleId && !ss.IsRemoved);
                if (db is null) return;

                db.IsRemoved = true;
                db.ModifiedDateTime = DateTime.Now;
                db.ModifiedUserId = systemUserId;

                context.Entry(db).State = EntityState.Modified;
                context.SaveChanges();
            });
        }


        #endregion SectorSales

        #region Photos

        public void SavePhoto(PhotoBlank blank, Guid systemUser)
        {
            _contextOptions.UseContext(context =>
            {
                PhotoDb db = blank.ToDb(systemUser);

                context.Photos.Add(db);
                context.Entry(db).State = EntityState.Added;
                context.SaveChanges();
            });
        }

        public Photo[] GetAllPhotos()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Photos.OrderByDescending(p => p.CreatedDateTime).ToPhotos();
            });
        }

        public void DeletePhoto(Guid photoId)
        {
            _contextOptions.UseContext(context =>
            {
                PhotoDb db = context.Photos.FirstOrDefault(p => p.Id == photoId);
                if (db is null) return;

                context.Photos.Remove(db);
                context.Entry(db).State = EntityState.Deleted;
                context.SaveChanges();
            });
        }

        #endregion Photos

        #region SectorCredits

        public void SaveCredit(SectorCreditBlank creditBlank, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                SectorCreditDb db = creditBlank.ToDb(systemUserId);

                context.Attach(db);
                context.SectorCredits.AddOrUpdate(db);
                context.SaveChanges();
            });
        }

        public SectorCredit[] GetNonZeroCredits()
        {
            return _contextOptions.UseContext(context =>
            {
                SectorCreditDb[] creditDbs = context.SectorCredits.Where(sc => sc.Credit > 0).ToArray();
                Guid[] sectorIds = creditDbs.Select(sc => sc.SectorId).ToArray();
                GardenSector[] sectors = context.GardenSectors.Where(gs => sectorIds.Contains(gs.Id)).ToGardenSectors();
                Gardener[] gardeners = context.Gardeners.Where(g => sectorIds.Contains(g.SectorId)).ToGardeners();

                return creditDbs.ToCredits(sectors, gardeners).OrderBy(c => c.Sector.SectorNumber).ToArray();
            });
        }

        public PagedResult<SectorCredit> GetCreditsPaged(Int32 page, Int32 count, Int32? sectorNumber, SectorCreditSort? sort)
        {
            return _contextOptions.UseContext(context =>
            {
                page.GetOffset(ref count, out Int32 offset);

                SectorCreditDb[] creditDbs = context.SectorCredits.ToArray();
                Guid[] sectorIds = creditDbs.Select(sc => sc.SectorId).ToArray();
                GardenSector[] sectors = context.GardenSectors.Where(gs => sectorIds.Contains(gs.Id)).ToGardenSectors();
                Gardener[] gardeners = context.Gardeners.Where(g => sectorIds.Contains(g.SectorId)).ToGardeners();

                if (sectorNumber is not null) sectors = sectors.Where(s => s.SectorNumber == sectorNumber).ToArray();
                SectorCredit[] credits = creditDbs
                    .Where(s => sectors.Any(sect => sect.Id == s.SectorId))
                    .ToCredits(sectors, gardeners)
                    .OrderBy(s => s.Sector.SectorNumber)
                    .Skip(offset)
                    .Take(count)
                    .ToArray();

                if (sort != null)
                {
                    credits = sort switch
                    {
                        SectorCreditSort.CreditAscending => credits.OrderBy(s => s.Credit).ToArray(),
                        SectorCreditSort.CreditDescending => credits.OrderByDescending(s => s.Credit).ToArray(),
                        _ => throw new Exception()
                    };
                }

                Int32 total = context.SectorCredits.Count();

                return new PagedResult<SectorCredit>(credits.ToList(), total);
            });
        }

        public DateTime? GetLastModifiedDateTime()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.SectorCredits.OrderByDescending(sc => sc.ModifiedDateTime).FirstOrDefault()?.ModifiedDateTime;
            });
        }

        public void DeleteCredit(Guid sectorCreditId)
        {
            _contextOptions.UseContext(context =>
            {
                SectorCreditDb db = context.SectorCredits.FirstOrDefault(sc => sc.Id == sectorCreditId);
                if (db is null) return;

                context.SectorCredits.Remove(db);
                context.Entry(db).State = EntityState.Deleted;
                context.SaveChanges();
            });
        }

        public void DeleteCreditBySectorId(Guid sectorId)
        {
            _contextOptions.UseContext(context =>
            {
                SectorCreditDb db = context.SectorCredits.FirstOrDefault(sc => sc.SectorId == sectorId);
                if (db is null) return;

                context.SectorCredits.Remove(db);
                context.Entry(db).State = EntityState.Deleted;
                context.SaveChanges();
            });
        }

        #endregion SectorCredits

        #region Tests

        internal void DeleteAllData()
        {

            _contextOptions.UseContext(context =>
            {
                context.Gardeners.RemoveRange(context.Gardeners);
                context.GardenSectors.RemoveRange(context.GardenSectors);

                context.SaveChanges();
            });
        }

        #endregion Tests
    }
}
