using GC.Domain.Gardens;
using GC.Domain.Gardens.Enums;
using GC.Domain.Gardens.Sectors.Sales;
using GC.Domain.Services.Gardens;
using GC.Tools.Types.Results;
using System;

namespace GC.Services.Gardens
{
    public partial class GardensService : IGardensService
    {
        public Result SaveSectorSale(SectorSaleBlank blank, Guid systemUserId)
        {
            if (blank.Id is null) blank.Id = Guid.NewGuid();
            if (String.IsNullOrEmpty(blank.FirstName)) return Result.Fail("Введите имя контактного лица");
            if (String.IsNullOrEmpty(blank.LastName)) return Result.Fail("Введите фамилию контактного лица");
            if (String.IsNullOrEmpty(blank.PhoneNumber)) return Result.Fail("Введите телефон контактного лица");
            if (blank.Price is null || blank.Price < 1) return Result.Fail("Некорректная стоимость продажи");
            if (blank.SectorId is null) return Result.Fail("Выберите участок для продажи");

            _gardensRepository.SaveSectorSale(blank, systemUserId);
            return Result.Success();
        }

        public PagedResult<SectorSale> GetSectorSalesPaged(Int32 page, Int32 pageSize, GardenStreet? street, SectorSaleSort? sort)
        {
            return _gardensRepository.GetSectorSalesPaged(page, pageSize, street, sort);
        }

        public Result RemoveSectorSale(Guid saleId, Guid systemUserId)
        {
            _gardensRepository.RemoveSectorSale(saleId, systemUserId);
            return Result.Success();
        }
    }
}
