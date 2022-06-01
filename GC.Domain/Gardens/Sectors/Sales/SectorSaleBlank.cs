using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GC.Domain.Gardens.Sectors.Sales
{
    public class SectorSaleBlank
    {
        public Guid? Id { get; set; }
        public Guid? SectorId { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String MiddleName { get; set; }
        public String Description { get; set; }
        public Int32? Price { get; set; }
        public String PhoneNumber { get; set; }
    }
}
