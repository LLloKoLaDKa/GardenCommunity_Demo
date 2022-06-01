using System;

namespace GC.Domain.Gardens.Appeals
{
    public class AppealBlank
    {
        public Guid? Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String PhoneNumber { get; set; }
        public String Title { get; set; }
        public String Message { get; set; }
        public String Email { get; set; }
        public DateTime? Date { get; set; }
    }
}
