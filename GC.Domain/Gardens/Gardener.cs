using GC.Domain.Persons;
using System;

namespace GC.Domain.Gardens
{
    public class Gardener : FromPerson
    {
        public Guid Id { get; }
        public String FirstName { get; }
        public String? MiddleName { get; }
        public String LastName { get; }
        public Guid SectorId { get; }

        public String FullName => $"{LastName} {FirstName} {MiddleName ?? ""}";
        public String Initials => $"{LastName} {FirstName[0]}. {$"{MiddleName}." ?? ""}";

        public Gardener(Guid id, String firstName, String? middleName, String lastName, Guid sectorId)
        {
            Id = id;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            SectorId = sectorId;
        }
    }
}
