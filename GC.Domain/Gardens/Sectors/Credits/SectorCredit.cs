using System;

namespace GC.Domain.Gardens.Sectors.Credits
{
    public class SectorCredit
    {
        public Guid Id { get; }
        public Gardener Gardener { get; }
        public GardenSector Sector { get; }
        public Int32 Credit { get; }

        public SectorCredit(Guid id, Gardener gardener, GardenSector sector, Int32 credit)
        {
            Id = id;
            Gardener = gardener;
            Sector = sector;
            Credit = credit;
        }
    }
}
