using GC.Domain.Persons;
using System;

namespace GC.Domain.Contacts.ForeignContacts
{
    public class ForeignContact : FromPerson
    {
        public Guid Id { get; }
        public ForeignContactType Type { get; }
        public String FirstName { get; }
        public String? MiddleName { get; }
        public String LastName { get; }
        public String PhoneNumber { get; }

        public ForeignContact(Guid id, ForeignContactType type, String firstName, String? middleName, String lastName, String phoneNumber)
        {
            Id = id;
            Type = type;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
        }
    }
}
