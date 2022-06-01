using System;

namespace GC.Domain.Persons
{
    public interface FromPersonBlank
    {
        public String? FirstName { get; set; }
        public String? MiddleName { get; set; }
        public String? LastName { get; set; }
    }
}
