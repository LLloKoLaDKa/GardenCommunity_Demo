using GC.Domain.Gardens;
using GC.Domain.Gardens.Appeals;
using GC.Domain.Gardens.Enums;
using GC.Domain.Gardens.Photos;
using GC.Domain.Gardens.Sectors;
using GC.Domain.Gardens.Sectors.Credits;
using GC.Domain.Gardens.Sectors.Sales;
using GC.Tools.Types.Results;
using System;
using System.Threading.Tasks;

namespace GC.Domain.Services.Gardens
{
    public interface IGardensService
    {
        #region Appeals

        public Result SaveAppeal(AppealBlank blank);
        public PagedResult<Appeal> GetAppealsPaged(Int32 page, Int32 pageSize, DateTime? startDate, DateTime? endDate, String? search);
        public void SetViewed(Guid appealId, Guid systemUserId);

        #endregion Appeals

        #region Gardeners

        public Result SaveGardener(GardenerBlank gardenerBlank, Guid systemUserId);
        public Gardener[] GetAll();
        public PagedResult<Gardener> GetGardenersPaged(Int32 page, Int32 count, String search);
        public Result RemoveGardener(Guid gardenerResult, Guid systemUserId);

        #endregion Gardeners

        #region GardenSectors

        public Result SaveGardenSector(GardenSectorBlank sectorBlank, Guid systemUserId);
        public GardenSector[] GetGardenSectorsByIds(Guid[] ids);
        public GardenSector[] GetAllSectors();
        public PagedResult<GardenSector> GetGardenSectorPaged(Int32 page, Int32 count, GardenStreet? street, Int32? sectorNumber);
        public Result RemoveGardenSector(Guid sectorId, Guid systemUserId);

        #endregion GardenSectors

        #region SectorSales

        public Result SaveSectorSale(SectorSaleBlank blank, Guid systemUserId);
        public PagedResult<SectorSale> GetSectorSalesPaged(Int32 page, Int32 pageSize, GardenStreet? street, SectorSaleSort? sort);
        public Result RemoveSectorSale(Guid saleId, Guid systemUserId);

        #endregion SectorSales

        #region Photos

        public Task<Result> SavePhoto(PhotoBlank blank, Guid systemUser);
        public Photo[] GetAllPhotos();
        public Result DeletePhoto(Photo photo);

        #endregion Photos

        #region SectorCredits

        public Result SaveCredit(SectorCreditBlank creditBlank, Guid systemUserId);
        public SectorCredit[] GetNonZeroCredits();
        public PagedResult<SectorCredit> GetCreditsPaged(Int32 page, Int32 count, Int32? sectorNumber, SectorCreditSort? sort);
        public DateTime? GetLastModifiedDateTime();
        public Result TryRenderReport();
        public Result DeleteCredit(Guid sectorCreditId);

        #endregion SectorCredits
    }
}
