using GC.Domain.Services.Statistics;
using GC.Domain.Statistics.PageEntries;
using GC.EntitiesCore.Repositories.Statistics;
using GC.Tools.Types.Results;
using System;

namespace GC.Services.Statistics
{
    public class StatisticsService : IStatisticsService
    {
        private readonly IStatisticsRepository _statisticsRepository;

        public StatisticsService(IStatisticsRepository statisticsRepository)
        {
            _statisticsRepository = statisticsRepository;
        }

        public void SavePageEntry(PageEntryBlank entryBlank)
        {
            if (entryBlank.Id is null) entryBlank.Id = Guid.NewGuid();
            _statisticsRepository.SavePageEntry(entryBlank);
        }

        public PageEntry[] GetPageEntries(DateTime? startDate, DateTime? endDate)
        {
            return _statisticsRepository.GetPageEntries(startDate, endDate);
        }
    }
}
