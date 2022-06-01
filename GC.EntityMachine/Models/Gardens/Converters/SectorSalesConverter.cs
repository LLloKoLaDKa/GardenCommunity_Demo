using GC.Domain.Gardens.Sectors;
using GC.Domain.Gardens.Sectors.Sales;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Gardens.Converters
{
    public static class SectorSalesConverter
    {
        public static SectorSale ToSectorSale(this SectorSaleDb db, GardenSector sector)
        {
            return new(db.Id, sector, db.FirstName, db.LastName, db.MiddleName, db.Description, db.Price, db.PhoneNumber, db.PublishDate);
        }

        public static SectorSale[] ToSectorSales(this IEnumerable<SectorSaleDb> dbs, IEnumerable<GardenSector> sectors)
        {
            return dbs.Where(d => sectors.Any(s => s.Id == d.SectorId)).Select(d => {
                GardenSector sector = sectors.First(s => s.Id == d.SectorId);
                return d.ToSectorSale(sector);
            }).ToArray();
        }

        public static SectorSaleDb ToDb(this SectorSaleBlank blank, Guid systemUserId, Boolean isRemoved = false)
        {
            return new(blank.Id.Value, blank.SectorId.Value, blank.FirstName, blank.LastName, blank.MiddleName, blank.Description, blank.Price.Value, blank.PhoneNumber,
                DateTime.Now, systemUserId, DateTime.Now, isRemoved);
        }
    }
}
