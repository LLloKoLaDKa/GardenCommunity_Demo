using GC.Domain.Statistics.PageEntries;
using System;

namespace GC.EntitiesCore.Repositories.Statistics
{
    public interface IStatisticsRepository
    {
        public void SavePageEntry(PageEntryBlank entryBlank);
        public PageEntry[] GetPageEntries(DateTime? startDate, DateTime? endDate);
    }
}
