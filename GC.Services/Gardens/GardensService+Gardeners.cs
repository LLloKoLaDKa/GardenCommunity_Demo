using GC.Domain.Contacts.GardenContacts;
using GC.Domain.Gardens;
using GC.Domain.Services.Gardens;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using System;
using System.Linq;

namespace GC.Services.Gardens
{
    public partial class GardensService : IGardensService
    {
        public Result SaveGardener(GardenerBlank gardenerBlank, Guid systemUserId)
        {
            if (!gardenerBlank.IsValid(out Result result)) return result;
            if (gardenerBlank.Id is null) gardenerBlank.Id = Guid.NewGuid();

            _gardensRepository.SaveGardener(gardenerBlank, systemUserId);
            return Result.Success();
        }

        public Gardener[] GetAll()
        {
            return _gardensRepository.GetAllGardeners();
        }

        public PagedResult<Gardener> GetGardenersPaged(Int32 page, Int32 count, String search)
        {
            return _gardensRepository.GetGardenersPaged(page, count, search);
        }

        public Result RemoveGardener(Guid gardenerId, Guid systemUserId)
        {
            GardenContact[] contacts = _contactsRepository.GetGardenContactsByGardenerId(gardenerId);
            if (contacts.Length != 0) return Result.Fail($"Нельзя удалить садовода, который прикреплён к контакту. Удалите данные о контактах:" +
                $" {String.Join(", ", contacts.Select(c => c.Type.GetDisplayName()))}");

            _gardensRepository.RemoveGardener(gardenerId, systemUserId);
            return Result.Success();
        }
    }
}
