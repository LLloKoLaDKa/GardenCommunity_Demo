using System;

namespace GC.Domain.Users
{
    public class UserToken
    {
        public Guid Id { get; }
        public Guid UserId { get; }
        public Guid? PermissionId { get; }
        public Boolean IsAuthorized => PermissionId is not null;

        private UserToken(Guid id, Guid userId)
        {
            Id = id;
            UserId = userId;
        }

        public UserToken(Guid token, Guid userId, Guid? permissionId)
        {
            Id = token;
            UserId = userId;
            PermissionId = permissionId;
        }

        public static UserToken New(Guid userId) => new UserToken(Guid.NewGuid(), userId);
    }
}
