using GC.Domain.Gardens.Photos;
using GC.Domain.Services.Gardens;
using GC.Tools.Common;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;

namespace GC.Services.Gardens
{
    public partial class GardensService : IGardensService
    {
        public async Task<Result> SavePhoto(PhotoBlank blank, Guid systemUser)
        {
            blank.Id = Guid.NewGuid();
            if (String.IsNullOrEmpty(blank.Image)) return Result.Fail("Укажите фотографию");

            try
            {
                String folderName = "img\\photos";
                String webRootPath = _hostingEnvironment.ContentRootPath;
                String newPath = $"{webRootPath}\\wwwroot\\{folderName}";
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                String extention = blank.Image.GetFileExtension();
                String fileName = blank.Id + ".jpg";
                String fullPath = Path.Combine(newPath, fileName);
                String envpath = folderName + "\\" + fileName;

                (Byte[], String) bytes = blank.Image.GetBytes();
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

            _gardensRepository.SavePhoto(blank, systemUser);
            return Result.Success();
        }

        public Photo[] GetAllPhotos()
        {
            return _gardensRepository.GetAllPhotos();
        }

        public Result DeletePhoto(Photo photo)
        {
            String webRootPath = _hostingEnvironment.ContentRootPath;
            String newPath = $"{webRootPath}\\wwwroot{photo.Path.Replace("/", "\\")}";
            if (File.Exists(newPath))
            {
                File.Delete(newPath);
            }

            _gardensRepository.DeletePhoto(photo.Id);
            return Result.Success();
        }
    }
}
