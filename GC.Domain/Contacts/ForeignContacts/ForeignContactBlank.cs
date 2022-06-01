using GC.Domain.Persons;
using System;

namespace GC.Domain.Contacts.ForeignContacts
{
    public class ForeignContactBlank : FromPersonBlank
    {
        public Guid? Id { get; set; }
        public ForeignContactType? Type { get; set; }
        public String? FirstName { get; set; }
        public String? MiddleName { get; set; }
        public String? LastName { get; set; }
        public String? PhoneNumber { get; set; }
    }
}
