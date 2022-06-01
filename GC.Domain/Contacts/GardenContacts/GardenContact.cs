using GC.Domain.Gardens;
using System;

namespace GC.Domain.Contacts.GardenContacts
{
    public class GardenContact
    {
        public Guid Id { get; }
        public Gardener Gardener { get; }
        public GardenContactType Type { get; }
        public String PhoneNumber { get; }

        public GardenContact(Guid id, Gardener gardener, GardenContactType type, string phoneNumber)
        {
            Id = id;
            Gardener = gardener;
            Type = type;
            PhoneNumber = phoneNumber;
        }
    }
}
