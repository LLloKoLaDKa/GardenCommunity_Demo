using GC.Domain.Gardens.Sectors;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Gardens.Converters
{
    public static class GardenSectorsConverters
    {
        public static GardenSector ToGardenSector(this GardenSectorDb db)
        {
            return new GardenSector(db.Id, db.SectorNumber, db.ElectricityContractNumber, db.NumberOfAcres, db.CadastralNumber);
        }

        public static GardenSector[] ToGardenSectors(this IEnumerable<GardenSectorDb> dbs)
        {
            return dbs.Select(ToGardenSector).ToArray();
        }

        public static GardenSectorDb ToGardenSectorDb(this GardenSectorBlank blank, Guid systemUserId)
        {
            return new GardenSectorDb(blank.Id.Value, blank.SectorNumber.Value, blank.ElectricityNumber,
                blank.NumberOfAcres.Value, blank.CadastralNumber, DateTime.Now, systemUserId, false);;
        }
    }
}
