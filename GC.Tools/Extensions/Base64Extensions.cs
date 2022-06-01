using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GC.Tools.Extensions
{
    public static class Base64Extensions
    {
        public static (Byte[], String) GetBytes(this String value)
        {
            String base64String = value;
            if (value.Contains(",")) base64String = value.Split(',')[1];

            return (Convert.FromBase64String(base64String), base64String);
        }


        public static string GetFileExtension(this string base64String)
        {
            var data = base64String.Substring(0, 5);

            switch (data.ToUpper())
            {
                case "IVBOR":
                    return "png";
                case "/9J/4":
                    return "jpg";
                default:
                    return string.Empty;
            }
        }
    }
}
