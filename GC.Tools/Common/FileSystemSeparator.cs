using System;
using System.IO;

namespace GC.Tools.Common
{
    public static class FileSystemSeparator
    {
        public static String GetPath(String path, Char currentSeparator = '/')
        {
            return currentSeparator == Path.DirectorySeparatorChar
                ? path
                : path.Replace(currentSeparator, Path.DirectorySeparatorChar);
        }

    }
}
