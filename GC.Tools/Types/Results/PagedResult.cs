using System;
using System.Collections.Generic;

namespace GC.Tools.Types.Results
{
    public static class PagedResult
    {
        public static PagedResult<T> Create<T>(IEnumerable<T> values, Int64 totalRows)
        {
            return new PagedResult<T>(values, totalRows);
        }
    }

    public class PagedResult<T>
    {
        public List<T> Values { get; }
        public Int64 TotalRows { get; }

        public PagedResult(List<T> values, Int64 totalRows)
        {
            Values = values;
            TotalRows = totalRows;
        }

        public PagedResult(IEnumerable<T> values, Int64 totalRows)
        {
            Values = new List<T>(values);
            TotalRows = totalRows;
        }
    }
}
