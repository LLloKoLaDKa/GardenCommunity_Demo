using GC.Domain.Records.Novelties;
using GC.Tools.Types.Results;
using System;
using System.Threading.Tasks;

namespace GC.Domain.Services.Records
{
    public interface INoveltiesService
    {
        public Task<Result> SaveNovelty(NoveltyBlank blank, Guid systemUserId, Boolean isPublish = false);
        public PagedResult<Novelty> GetNoveltiesPaged(Int32 page, Int32 count, String search);
        public Novelty[] GetArchiveNovelties();
        public Novelty[] GetThreeLast();
        public Novelty GetById(Guid noveltyId);
        public Result TakeOffNovelty(Guid noveltyId, Guid systemUserId);
        public Result RemoveNovelty(Guid noveltyId, Guid systemUserId);
    }
}
