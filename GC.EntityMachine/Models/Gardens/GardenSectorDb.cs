using GC.Domain.Gardens;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Gardens
{
    [Table("gd_sectors")]
    public class GardenSectorDb
    {
        [Column("id")]
        public Guid Id { get; set; }
        
        [Column("sectornumber")]
        public Int32 SectorNumber { get; set; }

        [Column("electricitynumber")]
        public String ElectricityContractNumber { get; set; }

        [Column("numberofacres")]
        public Double NumberOfAcres { get; set; }

        [Column("cadastralnumber")]
        public String CadastralNumber { get; set; }
        
        [Column("modifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }
        
        [Column("modifieduserid")]
        public Guid ModifiedUserId { get; set; }
        
        [Column("isremoved")]
        public Boolean IsRemoved { get; set; }

        public GardenSectorDb(Guid id, Int32 sectorNumber, String electricityContractNumber, Double numberOfAcres,
            String cadastralNumber, DateTime modifiedDateTime, Guid modifiedUserId, Boolean isRemoved)
        {
            Id = id;
            SectorNumber = sectorNumber;
            ElectricityContractNumber = electricityContractNumber;
            NumberOfAcres = numberOfAcres;
            CadastralNumber = cadastralNumber;
            ModifiedDateTime = modifiedDateTime;
            ModifiedUserId = modifiedUserId;
            IsRemoved = isRemoved;
        }
    }
}
