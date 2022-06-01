using GC.Domain.Records.Novelties;
using GC.Domain.Services.Records;
using GC.EntitiesCore.Repositories.Records.Novelties;
using GC.Tools.Common;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;

namespace GC.Services.Records
{
    public class NoveltiesService : INoveltiesService
    {
        private readonly INoveltiesRepository _noveltiesRepository;
        private readonly IHostingEnvironment _hostingEnvironment;

        public NoveltiesService(INoveltiesRepository noveltiesRepository, IHostingEnvironment hostingEnvironment)
        {
            _noveltiesRepository = noveltiesRepository;
            _hostingEnvironment = hostingEnvironment;
        }
        
        public async Task<Result> SaveNovelty(NoveltyBlank blank, Guid systemUserId, Boolean isPublish = false)
        {
            if (blank.Id is null) blank.Id = Guid.NewGuid();
            if (String.IsNullOrWhiteSpace(blank.Title)) return Result.Fail("Укажите название новости");
            if (String.IsNullOrWhiteSpace(blank.Description)) return Result.Fail("Укажите описание новости");
            if (blank.PublishDate is null) blank.PublishDate = DateTime.Now;

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
                    String folderName = "img\\novelties";
                    String newPath = $"{webRootPath}\\wwwroot\\{folderName}";
                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    String fileName = blank.Id + ".jpg";
                    String fullPath = Path.Combine(newPath, fileName);
                    String envpath = folderName + "\\" + fileName;

                    (Byte[], String) bytes = blank.Image.Contains("/img/novelties") ? (existImage, blank.Image) : blank.Image.GetBytes();
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

            _noveltiesRepository.SaveNovelty(blank, systemUserId, isPublish);
            return Result.Success();
        }

        public Novelty[] GetArchiveNovelties()
        {
            return _noveltiesRepository.GetArchiveNovelties();
        }

        public Novelty[] GetThreeLast()
        {
            return _noveltiesRepository.GetThreeLast();
        }

        public Novelty GetById(Guid noveltyId)
        {
            return _noveltiesRepository.GetById(noveltyId);
        }

        public PagedResult<Novelty> GetNoveltiesPaged(Int32 page, Int32 count, String search)
        {
            return _noveltiesRepository.GetNoveltiesPaged(page, count, search);
        }

        public Result TakeOffNovelty(Guid noveltyId, Guid systemUserId)
        {
            _noveltiesRepository.TakeOffNovelty(noveltyId, systemUserId);
            return Result.Success();
        }

        public Result RemoveNovelty(Guid noveltyId, Guid systemUserId)
        {
            _noveltiesRepository.RemoveNovelty(noveltyId, systemUserId);
            return Result.Success();
        }
    }
}
