using GC.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Users.Converters
{
    internal static class UserTokensConverter
    {
        internal static UserToken ToUserToken(this UserTokenDb db)
        {
            return new UserToken(db.Id, db.UserId, db.PermissionId);
        }

        internal static UserToken[] ToUserTokens(this IEnumerable<UserTokenDb> dbs)
        {
            return dbs.Select(ToUserToken).ToArray();
        }

        internal static UserTokenDb ToUserTokenDb(this UserToken token, DateTime expiredDateTimeUtc)
        {
            return new UserTokenDb(token.Id, token.UserId, token.PermissionId, expiredDateTimeUtc, DateTime.Now);
        }
    }
}
