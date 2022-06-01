using GC.Domain.Services.Users;
using GC.Domain.Users;
using System;

namespace GC.Services.Users
{
    public partial class UsersService : IUsersService // + UsersTokens
    {
        public UserToken GetToken(String tokenString)
        {
            return _usersRepository.GetToken(new Guid(tokenString));
        }

        public void ClearTokenPermission(Guid tokenId)
        {
            _usersRepository.ClearTokenPermission(tokenId);
        }
    }
}
