using GC.Domain.Gardens;
using GC.Domain.Gardens.Sectors;
using GC.Domain.Services.Gardens;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using System;

namespace GC.Services.Gardens
{
    public partial class GardensService : IGardensService
    {
        public Result SaveGardenSector(GardenSectorBlank sectorBlank, Guid systemUserId)
        {
            if (!sectorBlank.IsValid(out Result result)) return result;
            if (sectorBlank.ElectricityNumber is null) return Result.Fail("Введите номер электроснабжения");
            if (String.IsNullOrWhiteSpace(sectorBlank.CadastralNumber)) return Result.Fail("Введите кадастровый номер");
            if (sectorBlank.NumberOfAcres is null || sectorBlank.NumberOfAcres < 1) return Result.Fail("Количество соток должно быть не меньше 1");

            if (sectorBlank.Id is null)
            { 
                sectorBlank.Id = Guid.NewGuid();
                _gardensRepository.SaveCredit(new() { Id = Guid.NewGuid(), SectorId = sectorBlank.Id, Credit = 0 }, systemUserId);
            }

            GardenSector? existSectorWithSameNumber = _gardensRepository.GetGardenSectorByNumber(sectorBlank.SectorNumber.Value);
            if (existSectorWithSameNumber is not null) return Result.Fail("Участок с таким номеров уже существует");

            _gardensRepository.SaveGardenSector(sectorBlank, systemUserId);
            return Result.Success();
        }

        public GardenSector[] GetGardenSectorsByIds(Guid[] ids)
        {
            return _gardensRepository.GetGardenSectorsByIds(ids);
        }

        public GardenSector[] GetAllSectors()
        {
            return _gardensRepository.GetAllSectors();
        }

        public PagedResult<GardenSector> GetGardenSectorPaged(Int32 page, Int32 count, GardenStreet? street, Int32? sectorNumber)
        {
            return _gardensRepository.GetGardenSectorsPaged(page, count, street, sectorNumber);
        }

        public Result RemoveGardenSector(Guid sectorId, Guid systemUserId)
        {
            _gardensRepository.DeleteCreditBySectorId(sectorId);

            _gardensRepository.RemoveGardenSector(sectorId, systemUserId);
            return Result.Success();
        }
    }
}
