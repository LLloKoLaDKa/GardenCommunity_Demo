using System;

namespace GC.EntitiesCore.Extensions
{
    internal static class IntExtensions
    {
        public static void GetOffset(this int page, ref int count, out int offset)
        {
            offset = (page - 1) * count;

            if (offset < 0) offset = 0;
            if (count < 0) count = 0;
        }
    }
}
