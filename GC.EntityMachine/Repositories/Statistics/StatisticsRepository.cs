using GC.Domain.Statistics.PageEntries;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Extensions;
using GC.EntitiesCore.Models.Statistics;
using GC.EntitiesCore.Models.Statistics.Converters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace GC.EntitiesCore.Repositories.Statistics
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly DbContextOptions<GardenContext> _contextOptions;

        public StatisticsRepository(DbContextOptions<GardenContext> contextOptions)
        {
            _contextOptions = contextOptions;
        }

        public void SavePageEntry(PageEntryBlank entryBlank)
        {
            _contextOptions.UseContext(context =>
            {
                PageEntryDb db = entryBlank.ToDb();

                context.Attach(db);
                context.PageEntries.Add(db);
                context.SaveChanges();
            });
        }

        public PageEntry[] GetPageEntries(DateTime? startDate, DateTime? endDate)
        {
            return _contextOptions.UseContext(context =>
            {
                PageEntryDb[] dbs = context.PageEntries.ToArray();
                if (startDate is not null) dbs = dbs.Where(d => startDate <= d.CreatedDateTime).ToArray();
                if (endDate is not null) dbs = dbs.Where(d => d.CreatedDateTime <= endDate).ToArray();

                return dbs.ToPageEntries();
            });
        }
    }
}
