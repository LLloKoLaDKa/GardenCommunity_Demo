using GC.Domain.Users;
using GC.Tests.RepositorySetups;
using NUnit.Framework;
using System;

namespace GC.Tests
{
    internal class UserTokensTests : UsersRepositorySetup
    {
        [Test]
        [Order(0)]
        public void Can_Save_UserToken()
        {
            // arrange
            UserToken token = new UserToken(_userTokenId, _userId, _firstPermissionId);
            DateTime expiredDateTime = DateTime.Now.AddDays(1);

            //act
            _usersRepository.SaveToken(token, expiredDateTime);

            //assert
            Assert.That(true);
        }

        [Test]
        [Order(1)]
        public void Correctly_Saved_UserId()
        {
            // arrange
            Guid tokenId = _userTokenId;

            //act
            UserToken token = _usersRepository.GetToken(tokenId);

            //assert
            Assert.AreEqual(token.UserId, _userId);
        }

        [Test]
        [Order(2)]
        public void Correctly_Saved_PermissionId()
        {
            // arrange
            Guid tokenId = _userTokenId;
            Guid permissionId = _firstPermissionId;

            //act
            UserToken token = _usersRepository.GetToken(tokenId);

            //assert
            Assert.NotNull(token.PermissionId);
            Assert.AreEqual(token.PermissionId!.Value, permissionId);
        }

        [Test]
        [Order(3)]
        public void Method_Update_Permission()
        {
            // arrange
            Guid tokenId = _userTokenId;
            Guid permissionId = _secondPermissionId;

            //act
            _usersRepository.UpdateTokenPermission(tokenId, permissionId);
            UserToken token = _usersRepository.GetToken(tokenId);

            //assert
            Assert.NotNull(token.PermissionId);
            Assert.AreEqual(token.PermissionId!.Value, permissionId);
        }

        [Test]
        [Order(4)]
        public void Method_UpdateExpiredDateTime()
        {
            // arrange
            Guid tokenId = _userTokenId;
            DateTime expiredDatetime = DateTime.Now.AddDays(1);

            //act
            _usersRepository.UpdateTokenExpiredDateTime(tokenId, expiredDatetime);

            //assert
            Assert.That(true);
        }

        [Test]
        [Order(5)]
        public void Method_ClearPermission()
        {
            // arrange
            Guid tokenId = _userTokenId;

            //act
            _usersRepository.ClearTokenPermission(tokenId);
            UserToken token = _usersRepository.GetToken(tokenId);

            //assert
            Assert.That(!token.IsAuthorized);
        }

        [Test]
        [Order(6)]
        public void Method_RemoveToken()
        {
            // arrange
            Guid tokenId = _userTokenId;

            //act
            _usersRepository.RemoveToken(tokenId);
            UserToken? token = _usersRepository.GetToken(tokenId);

            //assert
            Assert.IsNull(token);
        }
    }
}
