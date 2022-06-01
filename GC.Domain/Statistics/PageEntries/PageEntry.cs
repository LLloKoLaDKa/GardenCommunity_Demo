using System;

namespace GC.Domain.Statistics.PageEntries
{
    public class PageEntry
    {
        public Guid Id { get; }
        public PageEntryType Type { get; }

        public PageEntry(Guid id, PageEntryType type)
        {
            Id = id;
            Type = type;
        }
    }
}
