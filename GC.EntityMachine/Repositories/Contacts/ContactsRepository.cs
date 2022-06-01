using GC.Domain.Contacts;
using GC.Domain.Contacts.EmergencyContacts;
using GC.Domain.Contacts.ForeignContacts;
using GC.Domain.Contacts.GardenContacts;
using GC.Domain.Gardens;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Extensions;
using GC.EntitiesCore.Models;
using GC.EntitiesCore.Models.Contacts;
using GC.EntitiesCore.Models.Contacts.Converters;
using GC.EntitiesCore.Models.Gardens.Converters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace GC.EntitiesCore.Repositories.Contacts
{
    public class ContactsRepository : IContactsRepository
    {
        private readonly DbContextOptions<GardenContext> _dbContextOptions;

        public ContactsRepository(DbContextOptions<GardenContext> options)
        {
            _dbContextOptions = options;
        }

        public void SaveGardenContacts(AllContactsBlank blanks, Guid systemUserId)
        {
            _dbContextOptions.UseContext(context =>
            {
                // Emergency contacts
                context.ForeignContacts.RemoveRange(context.ForeignContacts);

                foreach (EmergencyContactBlank emergencyBlank in blanks.EmergencyContacts)
                {
                    EmergencyContactDb db = emergencyBlank.ToDb(systemUserId);

                    context.Attach(db);
                    context.EmergencyContacts.AddOrUpdate(db);
                }

                // Foreign contacts
                context.ForeignContacts.RemoveRange(context.ForeignContacts);

                foreach (ForeignContactBlank foreignBlank in blanks.ForeignContacts)
                {
                    ForeignContactDb db = foreignBlank.ToDb(systemUserId);

                    context.Attach(db);
                    context.ForeignContacts.AddOrUpdate(db);
                }

                // Garden contacts
                context.GardenContacts.RemoveRange(context.GardenContacts);

                foreach (GardenContactBlank gardenBlank in blanks.GardenContacts)
                {
                    GardenContactDb db = gardenBlank.ToDb(systemUserId);

                    context.Attach(db);
                    context.GardenContacts.AddOrUpdate(db);
                }

                context.SaveChanges();
            });
        }

        public AllContacts GetAllContacts()
        {
            return _dbContextOptions.UseContext(context =>
            {
                GardenContactDb[] dbs = context.GardenContacts.ToArray();

                Guid[] gardneerIds = dbs.Select(d => d.GardenerId).ToArray();
                Gardener[] gardeners = context.Gardeners.Where(g => gardneerIds.Contains(g.Id)).ToGardeners();

                GardenContact[] gardenContactss = dbs.Where(d => gardeners.Any(g => g.Id == d.GardenerId)).ToGardenContacts(gardeners);
                ForeignContact[] foreignContacts = context.ForeignContacts.ToForeignContacts();
                EmergencyContact[] emergencyContacts = context.EmergencyContacts.ToEmergencyContacts();

                return new AllContacts(emergencyContacts, foreignContacts, gardenContactss);
            });
        }

        public GardenContact[] GetGardenContactsByGardenerId(Guid gardenerId)
        {
            return _dbContextOptions.UseContext(context =>
            {
                Gardener gardener = context.Gardeners.FirstOrDefault(g => g.Id == gardenerId)?.ToGardener();
                if (gardener is null) return new GardenContact[] { };

                return context.GardenContacts.Where(gc => gc.GardenerId == gardenerId).ToGardenContacts(new Gardener[] { gardener });
            });
        }
    }
}
