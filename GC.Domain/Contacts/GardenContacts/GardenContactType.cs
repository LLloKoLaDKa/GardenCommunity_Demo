using System;

namespace GC.Domain.Contacts.GardenContacts
{
    public enum GardenContactType
    {
        /// <summary>
        /// Председатель
        /// </summary>
        Chairman = 1,

        /// <summary>
        /// Член правления
        /// </summary>
        SeniorOnStreet = 2,

        /// <summary>
        /// Бухгалтер
        /// </summary>
        Accountant = 3
    }

    public static class GardenContactTypeExtensions
    {
        public static String GetDisplayName(this GardenContactType type)
        {
            switch(type)
            {
                case GardenContactType.Chairman: return "Председатель";
                case GardenContactType.SeniorOnStreet: return "Член правления";
                case GardenContactType.Accountant: return "Бухгалтер";

                default: throw new Exception("Точка недостижимости");
            }
        }
    }
}
