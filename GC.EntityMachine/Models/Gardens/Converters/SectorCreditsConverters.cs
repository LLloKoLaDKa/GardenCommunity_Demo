using GC.Domain.Gardens;
using GC.Domain.Gardens.Sectors;
using GC.Domain.Gardens.Sectors.Credits;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Gardens.Converters
{
    public static class SectorCreditsConverters
    {
        public static SectorCredit ToCredit(this SectorCreditDb db, GardenSector sector, Gardener gardener)
        {
            return new (db.Id, gardener, sector, db.Credit);
        }

        public static SectorCredit[] ToCredits(this IEnumerable<SectorCreditDb> dbs,
            IEnumerable<GardenSector> sectors, IEnumerable<Gardener> gardeners)
        {
            return dbs.Where(d => sectors.Any(s => s.Id == d.SectorId) && gardeners.Any(g => g.SectorId == d.SectorId))
                .Select(d =>
                {
                    GardenSector sector = sectors.First(s => s.Id == d.SectorId);
                    Gardener gardener = gardeners.First(g => g.SectorId == d.SectorId);

                    return d.ToCredit(sector, gardener);
                }).ToArray();
        }

        public static SectorCreditDb ToDb(this SectorCreditBlank blank, Guid systemUser)
        {
            return new(blank.Id.Value, blank.SectorId.Value, blank.Credit.Value, DateTime.Now, systemUser);
        }
    }
}
