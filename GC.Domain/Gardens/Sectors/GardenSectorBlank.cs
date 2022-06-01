using System;

namespace GC.Domain.Gardens.Sectors
{
    public class GardenSectorBlank
    {
        public Guid? Id { get; set; }
        public Int32? SectorNumber { get; set; }
        public String? ElectricityNumber { get; set; }
        public Double? NumberOfAcres { get; set; }
        public String? CadastralNumber { get; set; }
    }
}
