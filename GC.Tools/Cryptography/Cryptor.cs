using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace GC.Tools.Cryptography
{
    public static class Cryptor
    {

        public static string Encrypt(String clearText)
        {
            byte[] bytes = Encoding.Unicode.GetBytes(clearText);

            MD5CryptoServiceProvider CSP = new MD5CryptoServiceProvider();
            byte[] byteHash = CSP.ComputeHash(bytes);

            string hash = string.Empty;

            foreach (byte b in byteHash)
                hash += string.Format("{0:x2}", b);

            return hash;
        }
    }
}
