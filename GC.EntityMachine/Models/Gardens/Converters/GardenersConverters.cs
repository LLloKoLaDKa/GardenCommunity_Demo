using GC.Domain.Gardens;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Gardens.Converters
{
    internal static class GardenersConverters
    {
        public static Gardener ToGardener(this GardenerDb db)
        {
            return new Gardener(db.Id, db.FirstName, db.MiddleName, db.LastName, db.SectorId);
        }

        public static Gardener[] ToGardeners(this IEnumerable<GardenerDb> dbs)
        {
            return dbs.Select(ToGardener).ToArray();
        }

        public static GardenerDb ToGardenerDb(this GardenerBlank gardener, Guid systemUserId, Boolean deletable = false)
        {
            return new GardenerDb(gardener.Id.Value, gardener.FirstName, gardener.MiddleName, gardener.LastName, gardener.SectorId.Value,
                DateTime.Now, systemUserId, deletable);
        }
    }
}
