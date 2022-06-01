using GC.EntitiesCore.Context;
using Microsoft.EntityFrameworkCore;
using System;

namespace GC.EntitiesCore.Extensions
{
    internal static class DbContextOptionsExtensions
    {
        internal static void UseContext(this DbContextOptions<GardenContext> contextOptions, Action<GardenContext> action)
        {
            using (GardenContext _context = new(contextOptions))
            {
                action(_context);
            }
        }

        internal static T UseContext<T>(this DbContextOptions<GardenContext> contextOptions, Func<GardenContext, T> action)
        {
            using (GardenContext _context = new(contextOptions))
            {
                T result = action(_context);
                return result;
            }
        }
    }
}
