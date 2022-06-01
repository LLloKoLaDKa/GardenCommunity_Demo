using System;

namespace GC.Domain.Persons
{
    public interface FromPerson
    {
        public String FirstName { get; }
        public String? MiddleName { get; }
        public String LastName { get; }
    }
}
