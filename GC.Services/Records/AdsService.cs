using GC.Domain.Records.Ads;
using GC.Domain.Services.Records;
using GC.EntitiesCore.Repositories.Records.Ads;
using GC.Tools.Common;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;

namespace GC.Services.Records
{
    public class AdsService: IAdsService
    {
        private readonly IAdsRepository _adsRepository;
        private readonly IHostingEnvironment _hostingEnvironment;

        public AdsService(IAdsRepository adsRepository, IHostingEnvironment hostingEnvironment)
        {
            _adsRepository = adsRepository;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task<Result> SaveAd(AdBlank blank, Guid? systemUserId = null, Boolean isPusblish = false)
        {
            if (blank.Id is null) blank.Id = Guid.NewGuid();
            if (String.IsNullOrWhiteSpace(blank.Title)) return Result.Fail("Введите название объявления");
            if (String.IsNullOrWhiteSpace(blank.Description)) return Result.Fail("Введите описание объявления");
            if (String.IsNullOrWhiteSpace(blank.FirstName)) return Result.Fail("Введите имя подателя объявления");
            if (String.IsNullOrWhiteSpace(blank.LastName)) return Result.Fail("Введите фамилию подателя объявления");
            if (String.IsNullOrWhiteSpace(blank.PhoneNumber)) return Result.Fail("Введите номер телефона подателя объявления");
            if (blank.PublishDate is null) blank.PublishDate = DateTime.Now;

            if (systemUserId is null) blank.Type = AdType.Offered;
            else blank.Type = AdType.SelfWritten;

            Byte[] existImage = new Byte[0];
            if (blank.Image is not null)
            {
                String webRootPath = _hostingEnvironment.ContentRootPath;
                String imagePath = $"{webRootPath}\\wwwroot{blank.Image.Replace("/", "\\")}";
                if (File.Exists(imagePath))
                {
                    existImage = await File.ReadAllBytesAsync(imagePath);
                    File.Delete(imagePath);
                }

                try
                {
                    String folderName = "img\\ads";
                    String newPath = $"{webRootPath}\\wwwroot\\{folderName}";
                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    String fileName = blank.Id + ".jpg";
                    String fullPath = Path.Combine(newPath, fileName);
                    String envpath = folderName + "\\" + fileName;

                    (Byte[], String) bytes = blank.Image.Contains("/img/ads") ? (existImage, blank.Image) : blank.Image.GetBytes();
                    using (var ms = new MemoryStream(bytes.Item1))
                    {
                        await File.WriteAllBytesAsync(FileSystemSeparator.GetPath(fullPath), ms.ToArray());
                    }

                    blank.Image = "/" + envpath.Replace("\\", "/");
                }
                catch
                {
                    return Result.Fail("Не удалось сохранить фотографию");
                }
            }
            else
            {
                String webRootPath = _hostingEnvironment.ContentRootPath;
                String imagePath = $"{webRootPath}\\wwwroot\\img\\ads\\{blank.Id}.jpg";
                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                }
            }

            _adsRepository.SaveAd(blank, systemUserId, isPusblish);
            return Result.Success();
        }

        public Ad GetLastAd()
        {
            return _adsRepository.GetLastAd();
        }
        
        public Ad GetById(Guid adId)
        {
            return _adsRepository.GetById(adId);
        }

        public PagedResult<Ad> GetAdsPaged(Int32 page, Int32 count, AdType? adType = null, String search = "")
        {
            return _adsRepository.GetAdsPaged(page, count, adType, search);
        }

        public Ad[] GetOfferedAds()
        {
            return _adsRepository.GetOfferedAds();
        }

        public Int32 GetOfferedAdsCount()
        {
            return _adsRepository.GetOfferedAdsCount();
        }

        public Ad[] GetArchiveAds()
        {
            return _adsRepository.GetArchiveAds();
        }
        public Result TakeOffAd(Guid adId, Guid systemUserId)
        {
            _adsRepository.TakeOffAd(adId, systemUserId);

            return Result.Success();
        }

        public Result RemoveAd(Guid adId, Guid systemUserId)
        {
            _adsRepository.RemoveAd(adId, systemUserId);
            return Result.Success();
        }
    }
}
