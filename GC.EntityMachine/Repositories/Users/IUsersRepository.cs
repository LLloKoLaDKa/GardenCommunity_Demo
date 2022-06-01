using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.Tools.Types.Results;
using System;

namespace GC.EntitiesCore.Repositories.Users
{
    public interface IUsersRepository
    {

        #region UserAccessRoles

        public void SaveUserAccessRole(UserAccessRoleBlank userAccessRoleBlank, Guid systemUserId);
        public UserAccessRole[] GetUserAccessRoles();
        public void RemoveUserAccessRole(Guid roleId, Guid systemUserId);

        #endregion UserAccessRoles

        #region UserPermissions

        public int GetCountPermissionsByRoleId(Guid roleId);
        public UserPermission[] GetUserPermissions(Guid userId);

        #endregion UserPermissions

        #region Users

        public void SaveUser(UserBlank user, Guid systemUserId);
        public User GetUser(Guid userId);
        public User GetUser(string login);
        public User GetUser(string login, string passwordHash);
        public User[] GetUsers(Guid[] userIds);
        public User[] SearchUsers(string login);
        public PagedResult<User> GetUsersPaged(int page, int count);
        public void RemoveUser(Guid userId, Guid systemUserId);


        #endregion Users

        #region UserTokens

        public void SaveToken(UserToken token, DateTime expiredDateTime);
        public UserToken GetToken(Guid tokenId);
        public void UpdateTokenPermission(Guid tokenId, Guid permissionId);
        public void UpdateTokenExpiredDateTime(Guid tokenId, DateTime expiredDateTime);
        public void ClearTokenPermission(Guid tokenId);

        public void RemoveToken(Guid tokenId);

        #endregion UserTokens

    }
}
