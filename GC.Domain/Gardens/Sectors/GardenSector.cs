using System;

namespace GC.Domain.Gardens.Sectors
{
    public class GardenSector
    {
        public Guid Id { get; }
        public Int32 SectorNumber { get; }
        public String ElectricityNumber { get; }
        public Double NumberOfAcres { get; }
        public String CadastralNumber { get; }

        public GardenSector(Guid id, Int32 sectorNumber, String electricityNumber, Double numberOfAcres, String cadastralNumber)
        {
            Id = id;
            SectorNumber = sectorNumber;
            ElectricityNumber = electricityNumber;
            NumberOfAcres = numberOfAcres;
            CadastralNumber = cadastralNumber;
        }
    }
}
