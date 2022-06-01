using GC.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Users.Converters
{
    internal static class UsersConverter
    {
        internal static User ToUser(this UserDb db)
        {
            return new User(db.Id, db.Login);
        }

        internal static User[] ToUsers(this IEnumerable<UserDb> dbs)
        {
            return dbs.Select(ToUser).ToArray();
        }

        internal static UserDb ToUserDb(this UserBlank userBlank, string passwordHash, Guid systemUserId, bool deletable = false)
        {
            return new UserDb(userBlank.Id.Value, userBlank.Login, passwordHash, DateTime.Now, systemUserId, deletable);
        }
    }
}
