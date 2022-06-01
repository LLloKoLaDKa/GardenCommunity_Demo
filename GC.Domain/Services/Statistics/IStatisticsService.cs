using GC.Domain.Statistics.PageEntries;
using GC.Tools.Types.Results;
using System;

namespace GC.Domain.Services.Statistics
{
    public interface IStatisticsService
    {
        public void SavePageEntry(PageEntryBlank entryBlank);
        public PageEntry[] GetPageEntries(DateTime? startDate, DateTime? endDate);
    }
}
