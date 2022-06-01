using GC.Domain.Gardens;
using GC.Domain.Gardens.Appeals;
using GC.Domain.Gardens.Enums;
using GC.Domain.Gardens.Photos;
using GC.Domain.Gardens.Sectors;
using GC.Domain.Gardens.Sectors.Credits;
using GC.Domain.Gardens.Sectors.Sales;
using GC.Tools.Types.Results;
using System;

namespace GC.EntitiesCore.Repositories.Gardens
{
    public interface IGardensRepository
    {
        #region Appears

        public void SaveAppeal(AppealBlank appealBlank);
        public PagedResult<Appeal> GetAppealsPaged(Int32 page, Int32 pageSize, DateTime? startDate, DateTime? endDate, String? search);
        public void SetViewed(Guid appealId, Guid systemUserId);

        #endregion Appears

        #region Gardeners

        public void SaveGardener(GardenerBlank gardenerBlank, Guid systemUserId);
        public Gardener[] GetAllGardeners();
        public Gardener[] GetGardeners(Guid[] gardenerIds);
        public PagedResult<Gardener> GetGardenersPaged(Int32 page, Int32 count, String search);
        public void RemoveGardener(Guid gardenerId, Guid systemUserId);

        #endregion Gardeners

        #region GardenSectors

        public void SaveGardenSector(GardenSectorBlank sectorBlank, Guid systemUserId);
        public GardenSector GetGardenSectorByNumber(Int32 sectorNumber);
        public GardenSector[] GetGardenSectorsByIds(Guid[] ids);
        public GardenSector[] GetAllSectors();
        public PagedResult<GardenSector> GetGardenSectorsPaged(Int32 page, Int32 count, GardenStreet? street, Int32? sectorNumber);
        public void RemoveGardenSector(Guid sectorId, Guid systemUserId);

        #endregion GardenSectors

        #region SectorSales

        public void SaveSectorSale(SectorSaleBlank blank, Guid systemUserId);
        public PagedResult<SectorSale> GetSectorSalesPaged(Int32 page, Int32 pageSize, GardenStreet? street, SectorSaleSort? sort);
        public void RemoveSectorSale(Guid saleId, Guid systemUserId);

        #endregion SectorSales

        #region Photos

        public void SavePhoto(PhotoBlank blank, Guid systemUser);
        public Photo[] GetAllPhotos();
        public void DeletePhoto(Guid photoId);

        #endregion Photos

        #region SectorCredits

        public void SaveCredit(SectorCreditBlank creditBlank, Guid systemUserId);
        public SectorCredit[] GetNonZeroCredits();
        public PagedResult<SectorCredit> GetCreditsPaged(Int32 page, Int32 count, Int32? sectorNumber, SectorCreditSort? sort);
        public DateTime? GetLastModifiedDateTime();
        public void DeleteCredit(Guid sectorCreditId);
        public void DeleteCreditBySectorId(Guid sectorId);

        #endregion SectorCredits
    }
}
