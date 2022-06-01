using System;

namespace GC.Domain.Users
{
    public class User
    {
        public Guid Id { get; }
        public String Login { get; }

        public User(Guid id, String login)
        {
            Id = id;
            Login = login;
        }
    }
}
