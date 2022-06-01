using System;
using System.Reflection;

namespace GC.WebSpace.Infrastructure.Version
{
    public static class Version
    {
        private static readonly string AssemblyVersion = Assembly.GetExecutingAssembly().GetName().Version.ToString();

        public static string WithVersion(this string url) => $"{url}?v={AssemblyVersion}";
    }
}
