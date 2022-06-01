using GC.Domain.Records.Novelties;
using GC.Tools.Types.Results;
using System;

namespace GC.EntitiesCore.Repositories.Records.Novelties
{
    public interface INoveltiesRepository
    {
        public void SaveNovelty(NoveltyBlank blank, Guid systemUserId, Boolean isPublish = false);
        public Novelty[] GetArchiveNovelties();
        public Novelty[] GetThreeLast();
        public Novelty GetById(Guid noveltyId);
        public PagedResult<Novelty> GetNoveltiesPaged(Int32 page, Int32 count, String search);
        public void TakeOffNovelty(Guid noveltyId, Guid systemUserId);
        public void RemoveNovelty(Guid noveltyId, Guid systemUserId);
    }
}
