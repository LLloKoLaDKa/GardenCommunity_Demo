using GC.Domain.Contacts.EmergencyContacts;
using GC.Domain.Contacts.ForeignContacts;
using GC.Domain.Contacts.GardenContacts;
using GC.Domain.Gardens;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Contacts.Converters
{
    internal static class ContactsConverters
    {
        #region GardenContacts

        internal static GardenContact ToGardenContact(this GardenContactDb db, Gardener gardener)
        {
            return new(db.Id, gardener, db.Type, db.PhoneNumber);
        }

        internal static GardenContact[] ToGardenContacts(this IEnumerable<GardenContactDb> dbs, IEnumerable<Gardener> gardeners)
        {
            return dbs.Where(dbs => gardeners.Any(g => g.Id == dbs.GardenerId))
                .Select(d => d.ToGardenContact(gardeners.First(g => g.Id == d.GardenerId))).ToArray();
        }

        internal static GardenContactDb ToDb(this GardenContactBlank blank, Guid systemUserId)
        {
            return new(blank.Id.Value, blank.GardenerId.Value, blank.Type.Value, blank.PhoneNumber, systemUserId, DateTime.Now);
        }

        #endregion GardenContacts

        #region ForeignContacts

        internal static ForeignContact ToForeignContact(this ForeignContactDb db)
        {
            return new(db.Id, db.Type, db.FirstName, db.MiddleName, db.LastName, db.PhoneNumber);
        }

        internal static ForeignContact[] ToForeignContacts(this IEnumerable<ForeignContactDb> dbs)
        {
            return dbs.Select(d => d.ToForeignContact()).ToArray();
        }

        internal static ForeignContactDb ToDb(this ForeignContactBlank blank, Guid systemUserId)
        {
            return new(blank.Id.Value, blank.Type.Value, blank.FirstName, blank.MiddleName, blank.LastName, blank.PhoneNumber,
                systemUserId, DateTime.Now);
        }

        #endregion ForeignContacts

        #region EmergencyContacts

        internal static EmergencyContact ToEmergencyContact(this EmergencyContactDb db)
        {
            return new(db.Id, db.Type, db.CityPhone, db.MobilePhone);
        }

        internal static EmergencyContact[] ToEmergencyContacts(this IEnumerable<EmergencyContactDb> dbs)
        {
            return dbs.Select(ToEmergencyContact).ToArray();
        }

        internal static EmergencyContactDb ToDb(this EmergencyContactBlank blank, Guid systemUserId)
        {
            return new(blank.Id.Value, blank.Type.Value, blank.CityPhone, blank.MobilePhone, systemUserId, DateTime.Now);
        }

        #endregion EmergencyContacts
    }
}
