using GC.Configurator.Configurations;
using GC.Domain.Contacts;
using GC.Domain.Contacts.GardenContacts;
using GC.Domain.Gardens;
using GC.Domain.Gardens.Appeals;
using GC.Domain.Gardens.Enums;
using GC.Domain.Gardens.Photos;
using GC.Domain.Gardens.Sectors;
using GC.Domain.Gardens.Sectors.Credits;
using GC.Domain.Gardens.Sectors.Sales;
using GC.Domain.Records.Ads;
using GC.Domain.Records.Novelties;
using GC.Domain.Services.Contacts;
using GC.Domain.Services.Gardens;
using GC.Domain.Services.Records;
using GC.Domain.Services.Statistics;
using GC.Domain.Statistics.PageEntries;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using static GC.WebSpace.Areas.Gardens.Controllers.GardenSectorsController;

namespace GC.WebSpace.Areas.Site.Controllers
{
    public class SiteController : BaseController
    {
        private readonly INoveltiesService _noveltiesService;
        private readonly IAdsService _adsService;
        private readonly IContactsService _contactsService;
        private readonly IGardensService _gardensService;
        private readonly IStatisticsService _statisticsService;

        public SiteController(INoveltiesService noveltiesService, IAdsService adsService, IContactsService contactsService,
            IGardensService gardensService, IStatisticsService statisticsService)
        {
            _noveltiesService = noveltiesService;
            _adsService = adsService;
            _contactsService = contactsService;
            _gardensService = gardensService;
            _statisticsService = statisticsService;
        }

        [HttpGet("/")]
        [HttpGet("/News")]
        [HttpGet("/News/{noveltyId}")]
        [HttpGet("/Ads")]
        [HttpGet("/Ads/{adId}")]
        [HttpGet("/Contacts")]
        [HttpGet("/SectorSales")]
        [HttpGet("/Information")]
        [HttpGet("/Gallery")]
        [HttpGet("/Credits")]
        public IActionResult Index() => ReactApp("site", "СНТ «Полесье»");

        #region Novelties

        [HttpGet("/Novelties/GetThreeLast")]
        public Novelty[] GetThreeLastNovelties()
        {
            return _noveltiesService.GetThreeLast();
        }

        [HttpGet("/Novelties/GetById")]
        public Novelty GetNoveltyById(Guid noveltyId)
        {
            return _noveltiesService.GetById(noveltyId);
        }

        [HttpGet("/Novelties/GetPaged")]
        public PagedResult<Novelty> GetNoveltyPaged(int page, int pageSize)
        {
            return _noveltiesService.GetNoveltiesPaged(page, pageSize, "");
        }

        #endregion Novelties

        #region Ads

        [HttpPost("/Ads/SaveOffered")]
        public async Task<Result> SaveOffered([FromBody] AdBlank adBlank)
        {
            return await _adsService.SaveAd(adBlank);
        }

        [HttpGet("/Ads/GetLast")]
        public Ad GetLastAd()
        {
            return _adsService.GetLastAd();
        }

        [HttpGet("/Ads/GetById")]
        public Ad GetAdById(Guid adId)
        {
            return _adsService.GetById(adId);
        }

        [HttpGet("/Ads/GetPaged")]
        public PagedResult<Ad> GetAdsPaged(int page, int pageSize)
        {
            return _adsService.GetAdsPaged(page, pageSize);
        }

        #endregion Ads

        #region Contacts

        [HttpGet("/Contacts/GetAllContacts")]
        public AllContacts GetAllContacts()
        {
            return _contactsService.GetAllContacts();
        }

        #endregion Contacts

        #region Appeals

        [HttpPost("/Appeals/Save")]
        public Result SaveAppeal([FromBody] AppealBlank appealBlank)
        {
            return _gardensService.SaveAppeal(appealBlank);
        }

        #endregion Appeals

        #region GardenSectors

        [HttpGet("/GardenSectors/GetByIds")]
        public GardenSector[] GetGardenSectorsByIds(Guid[] ids)
        {
            return _gardensService.GetGardenSectorsByIds(ids);
        }

        #endregion GardenSectors

        #region SectorSales

        [HttpGet("/SectorSales/GetPaged")]
        public PagedResult<SectorSale> GetSalesPaged(int page, int count, GardenStreet? street, SectorSaleSort? sort)
        {
            return _gardensService.GetSectorSalesPaged(page, count, street, sort);
        }

        #endregion SectorSales

        #region Information

        [HttpGet("/Information/GetGardenSettings")]
        public GardenSettings GetGardenSettings()
        {
            return new(
                Configuration.Contributions.MemberContribution,
                Configuration.Contributions.TargetContribution,
                Configuration.GardenSettings.Ogrn,
                Configuration.GardenSettings.Inn,
                Configuration.GardenSettings.Kpp,
                Configuration.GardenSettings.Okpo,
                Configuration.GardenSettings.Oktmo,
                Configuration.GardenSettings.CheckingAccount,
                Configuration.GardenSettings.BankName,
                Configuration.GardenSettings.CorrespondentAccount,
                Configuration.GardenSettings.Bik,
                Configuration.GardenSettings.Address,
                _contactsService.GetAllContacts().GardenContacts.FirstOrDefault(gc => gc.Type == GardenContactType.Chairman)
            );
        }

        public record GardenSettings(int memberContribution, int targetContribution, long ogrn, long inn, long kpp, long okpo,
            long oktmo, string checkingAccount, string bankName, string coresspondentAccount, long bik, string address, GardenContact chairman);

        #endregion

        #region Gallery

        [HttpGet("/Gallery/GetAll")]
        public Photo[] GetAllPhotos()
        {
            return _gardensService.GetAllPhotos();
        }

        #endregion Gallery

        #region Credits

        [HttpGet("/Credits/GetNonZero")]
        public SectorCredit[] GetNonZeroCredits()
        {
            return _gardensService.GetNonZeroCredits();
        }

        [HttpGet("/Credits/GetLastModifiedDateTime")]
        public DateTime? GetLastModifiedDateTime()
        {
            return _gardensService.GetLastModifiedDateTime();
        }

        #endregion

        #region Statistics

        [HttpPost("/Statistics/SavePageEntry")]
        public bool SavePageEntry([FromBody] PageEntryBlank entryBlank)
        {
            _statisticsService.SavePageEntry(entryBlank);
            return true;
        }

        #endregion
    }
}
