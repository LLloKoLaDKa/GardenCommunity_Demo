using System;

namespace GC.Domain.Contacts.EmergencyContacts
{
    public enum EmergencyContactType
    {
        /// <summary>
        /// Пожарная часть
        /// </summary>
        FireDepartment = 1,

        /// <summary>
        /// Полиция
        /// </summary>
        Police = 2,

        /// <summary>
        /// Скорая помощь
        /// </summary>
        Ambulance = 3,

        /// <summary>
        /// МЧС
        /// </summary>
        MinistryOfEmergencySituations = 4,

        /// <summary>
        /// Земельный комитет
        /// </summary>
        LandCommittee = 5
    }

    public static class EmergencyContactTypeExtensions
    {
        public static String GetDisplayName(this EmergencyContactType type)
        {
            switch(type)
            {
                case EmergencyContactType.FireDepartment: return "Пожарная часть";
                case EmergencyContactType.Police: return "Полиция";
                case EmergencyContactType.Ambulance: return "Скорая помощь";
                case EmergencyContactType.MinistryOfEmergencySituations: return "МЧС";
                case EmergencyContactType.LandCommittee: return "Земельный комитет";

                default: throw new Exception("Точка недостижимости");
            }
        }
    }
}
