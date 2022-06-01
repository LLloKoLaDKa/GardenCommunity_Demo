using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.Tools.Types.Results;
using System;

namespace GC.Domain.Services.Users
{
    public interface IUsersService
    {
        #region Users

        public Result SaveUser(UserBlank userBlank, Guid systemUserId);
        public User GetUser(Guid userId);
        public User[] GetUsers(Guid[] userIds);
        public User[] SearchUsers(String login);
        public PagedResult<User> GetUsersPaged(Int32 page, Int32 count);
        public Int32 GetCountUsersByRoleId(Guid roleId);
        public Result RemoveUser(Guid userId, Guid systemUserId);

        #endregion Users

        #region Tokens

        public UserToken GetToken(String token);
        public void ClearTokenPermission(Guid tokenId);


        #endregion Tokens

        #region AccessRoles

        public Result SaveUserAccessRole(UserAccessRoleBlank userAccessRoleBlank, Guid systemUserId);
        public UserAccessRole[] GetUserAccessRoles();
        public Result RemoveUserAccessRole(Guid roleId, Guid systemUserId);


        #endregion AccessRoles

        #region Permissions

        public UserPermission[] GetUserPermissions(Guid userId);

        #endregion UserPermissions

        #region Authentication

        public Result Authorize(UserToken token, UserPermission permission);
        public DataResult<UserToken> Authenticate(String login, String password);
        public void Prolongate(Guid tokenId);
        public void LogOut(Guid tokenId);


        #endregion Authentication

    }
}
