using System;

namespace GC.Domain.Gardens
{
    public enum GardenStreet
    {
        First = 1,
        Second = 2,
        Third = 3,
        Fourth = 4,
        Fifth = 5,
        Sixth = 6,
        Seventh = 7,
        Eighth = 8,
        Nineth = 9,
        Tenth = 10,
        Eleven = 11,
    }

    public static class GardenStreetExtensions
    {
        public static Boolean ContainSectorNumber(this GardenStreet street, Int32 sectorNumber)
        {
            switch (street)
            {
                case GardenStreet.First: return Between(sectorNumber, 1, 23);
                case GardenStreet.Second: return Between(sectorNumber, 24, 36);
                case GardenStreet.Third: return Between(sectorNumber, 37, 47);
                case GardenStreet.Fourth: return Between(sectorNumber, 48, 63);
                case GardenStreet.Fifth: return Between(sectorNumber, 64, 80);
                case GardenStreet.Sixth: return Between(sectorNumber, 82, 97);
                case GardenStreet.Seventh: return Between(sectorNumber, 98, 111);
                case GardenStreet.Eighth: return Between(sectorNumber, 112, 127);
                case GardenStreet.Nineth: return Between(sectorNumber, 128, 136) || sectorNumber == 138 || sectorNumber == 139;
                case GardenStreet.Tenth: return Between(sectorNumber, 140, 149);
                case GardenStreet.Eleven: return Between(sectorNumber, 150, 190) || sectorNumber == 137;

                default: throw new Exception("Точка недостижимости");
            }
        }
        private static Boolean Between(Int32 value, Int32 start, Int32 end)
        {
            return value >= start && value <= end;
        }
    }
}
