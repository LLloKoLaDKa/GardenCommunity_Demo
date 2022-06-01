using GC.Domain.Statistics.PageEntries;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Statistics.Converters
{
    public static class PageEntriesConverters
    {
        public static PageEntry ToPageEntry(this PageEntryDb db)
        {
            return new(db.Id, db.Type);
        }

        public static PageEntry[] ToPageEntries(this IEnumerable<PageEntryDb> dbs)
        {
            return dbs.Select(ToPageEntry).ToArray();
        }

        public static PageEntryDb ToDb(this PageEntryBlank blank)
        {
            return new(blank.Id.Value, blank.Type.Value, DateTime.Now);
        }
    }
}
