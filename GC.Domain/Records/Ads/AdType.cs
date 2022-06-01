using System;

namespace GC.Domain.Records.Ads
{
    public enum AdType
    {
        SelfWritten = 1,
        Offered = 2
    }

    public static class AdTypeExtensions
    {
        public static String GetDisplayName(this AdType type)
        {
            switch(type)
            {
                case AdType.SelfWritten: return "Самописное объявление";
                case AdType.Offered: return "Предложенное объявление";
                default: throw new Exception("Не указана расшифровка для типа объявления");
            }
        }
    }
}
