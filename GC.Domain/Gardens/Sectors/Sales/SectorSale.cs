using System;

namespace GC.Domain.Gardens.Sectors.Sales
{
    public class SectorSale
    {
        public Guid Id { get; }
        public GardenSector Sector { get; }
        public String FirstName { get; }
        public String LastName { get; }
        public String MiddleName { get; }
        public String Description { get; }
        public Int32 Price { get; }
        public String PhoneNumber { get; }
        public DateTime PublishDate { get; }

        public SectorSale(Guid id, GardenSector sector, String firstName, String lastName, String middleName, String description, Int32 price, String phoneNumber, DateTime publishDate)
        {
            Id = id;
            Sector = sector;
            FirstName = firstName;
            LastName = lastName;
            MiddleName = middleName;
            Description = description;
            Price = price;
            PhoneNumber = phoneNumber;
            PublishDate = publishDate;
        }
    }
}
