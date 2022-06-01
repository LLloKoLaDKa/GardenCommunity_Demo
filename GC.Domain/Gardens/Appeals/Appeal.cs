using System;

namespace GC.Domain.Gardens.Appeals
{
    public class Appeal
    {
        public Guid Id { get; }
        public String FirstName { get; }
        public String LastName { get; }
        public String PhoneNumber { get; }
        public String Title { get; }
        public String Message { get; }
        public String Email { get; }
        public DateTime Date { get; }
        public Boolean IsViewed { get; }

        public Appeal(Guid id, String firstName, String lastName, String phoneNumber, String title, String message, String email,
            DateTime date, Boolean isViewed)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            Title = title;
            Message = message;
            Email = email;
            Date = date;
            IsViewed = isViewed;
        }
    }
}
