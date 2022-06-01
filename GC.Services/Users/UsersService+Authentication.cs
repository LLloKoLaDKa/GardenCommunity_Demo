using GC.Domain.Services.Users;
using GC.Domain.Users;
using GC.Tools.Cryptography;
using GC.Tools.Types.Results;
using System;
using System.Linq;

namespace GC.Services.Users
{
    public partial class UsersService : IUsersService // + UsersPermissions
    {

        public Result Authorize(UserToken token, UserPermission permission)
        {
            User user = _usersRepository.GetUser(token.UserId);

            UserPermission[] userPermissions = _usersRepository.GetUserPermissions(user.Id);
            if (userPermissions is null) return Result.Fail("Пользователь не имеет прикреплённых ролей");

            if (!userPermissions.ToList().Exists(p => p.AccessRoleId == permission.AccessRoleId))
                return Result.Fail("У пользователя нет прав на эту роль!");

            _usersRepository.UpdateTokenPermission(token.Id, userPermissions.FirstOrDefault(p => p.AccessRoleId == permission.AccessRoleId).Id);

            return Result.Success();
        }


        private const Int32 TokenTimeToLiveInDays = 7;

        public DataResult<UserToken> Authenticate(String login, String password)
        {
            if (String.IsNullOrWhiteSpace(login) || String.IsNullOrWhiteSpace(password))
                return DataResult<UserToken>.Failed("Неправильно указан логин или пароль");

            User user = _usersRepository.GetUser(login, Cryptor.Encrypt(password));
            if (user is null) return DataResult<UserToken>.Failed("Неправильно указан логин и пароль");

            UserToken token = UserToken.New(user.Id);

            DateTime expiredDateTime = DateTime.Now.AddDays(TokenTimeToLiveInDays);
            _usersRepository.SaveToken(token, expiredDateTime);

            return DataResult<UserToken>.Success(token);
        }

        public void Prolongate(Guid tokenId)
        {
            DateTime expiredDateTimeUtc = DateTime.UtcNow.AddDays(TokenTimeToLiveInDays);
            _usersRepository.UpdateTokenExpiredDateTime(tokenId, expiredDateTimeUtc);
        }

        public void LogOut(Guid tokenId)
        {
            _usersRepository.RemoveToken(tokenId);
        }
    }
}
