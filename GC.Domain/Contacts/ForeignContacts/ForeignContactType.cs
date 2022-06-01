using System;

namespace GC.Domain.Contacts.ForeignContacts
{
    public enum ForeignContactType
    {
        /// <summary>
        /// Элекрик
        /// </summary>
        Electric = 1,

        /// <summary>
        /// Участковый
        /// </summary>
        LocalPoliceman = 2,

        /// <summary>
        /// Лесник
        /// </summary>
        Forester = 3
    }

    public static class ForeignContactTypeExtensions
    {
        public static String GetDisplayName(this ForeignContactType type)
        {
            switch(type)
            {
                case ForeignContactType.Electric: return "Старший участковый лесничий";
                case ForeignContactType.LocalPoliceman: return "Участковый";
                case ForeignContactType.Forester: return "Электрик";

                default: throw new Exception("Точка недостижимости");
            }
        }
    }
}
