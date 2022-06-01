using GC.WebSpace.Infrastructure.Filters;
using GC.Domain.AccessPolicies;
using GC.Domain.Gardens.Photos;
using GC.Domain.Services.Gardens;
using GC.Tools.Types.Results;
using GC.WebSpace.Areas.Infrastructure.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GC.WebSpace.Areas.Gardens.Controllers
{
    public class PhotosController : BaseAuthorizedController
    {
        private readonly IGardensService _gardensService;

        public PhotosController(IGardensService gardensService)
        {
            _gardensService = gardensService;
        }

        [HttpGet("/IS/Photos")]
        [IsAuthorized(AccessPolicy.Photos_Catalog)]
        public IActionResult Index() => ReactApp("photos", "Фотографии");

        [HttpPost("/IS/Photos/Save")]
        [IsAuthorized(AccessPolicy.Photos_Catalog)]
        public async Task<Result> SavePhoto([FromBody] PhotoBlank photo)
        {
            return await _gardensService.SavePhoto(photo, SystemUser.Id);
        }

        [HttpGet("/IS/Photos/GetAllPhotos")]
        [IsAuthorized(AccessPolicy.Photos_Catalog)]
        public Photo[] GetAllPhotos()
        {
            return _gardensService.GetAllPhotos();
        }

        [HttpPost("/IS/Photos/Delete")]
        [IsAuthorized(AccessPolicy.Photos_Catalog)]
        public Result Delete([FromBody] Photo photo)
        {
            return _gardensService.DeletePhoto(photo);
        }
    }
}
