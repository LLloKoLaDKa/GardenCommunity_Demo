using GC.Domain.Users;
using GC.Tests.RepositorySetups;
using GC.Tools.Cryptography;
using GC.Tools.Types.Results;
using NUnit.Framework;
using System;
using System.Linq;

namespace GC.Tests
{
    internal class UsersTests : UsersRepositorySetup
    {
        [Test]
        [Order(0)]
        public void Can_Save_User()
        {
            // arrange
            UserPermissionBlank firstPermission = new()
            {
                Id = _firstPermissionId,
                AccessRoleId = _permissionAccessRoleId
            };
            UserPermissionBlank secondPermission = new()
            {
                Id = _secondPermissionId,
                AccessRoleId = _permissionAccessRoleId
            };

            UserBlank userBlank = new()
            {
                Id = _userId,
                Login = _userLogin,
                Password = _userPassword,
                RePassword = _userPassword,
                PasswordWasEdited = true,
                Permissions = new[]
                {
                    firstPermission,
                    secondPermission
                }
            };

            // act
            _usersRepository.SaveUser(userBlank, _systemUserId);

            // assert
            Assert.True(true);
        }

        [Test]
        [Order(1)]
        public void Correctly_Saved_Login()
        {
            // arrange
            String expectedLogin = _userLogin;

            // act
            User user = _usersRepository.GetUser(_userId);

            //assert
            Assert.AreEqual(expectedLogin, user.Login);
        }

        [Test]
        [Order(2)]
        public void Method_GetByLoginPassword()
        {
            // arrange
            String expectedPassword = _userPassword;
            
            // act
            User user = _usersRepository.GetUser(_userLogin, Cryptor.Encrypt(expectedPassword));

            //assert
            Assert.That(user, Is.Not.Null);
        }

        [Test]
        [Order(3)]
        public void Correctly_Saved_Permissions()
        {
            // arrange
            Guid expectedFirstPermissionId = _firstPermissionId;
            Guid expectedSecondPermissionId = _secondPermissionId;
            Guid expectedUserAccessRoleId = _permissionAccessRoleId;

            // act
            UserPermission[] userPermissions = _usersRepository.GetUserPermissions(_userId);

            //assert
            Assert.AreEqual(userPermissions.Length, 2);

            Assert.That(userPermissions[0], Is.Not.Null);
            Assert.AreEqual(userPermissions[0].Id, expectedFirstPermissionId);
            Assert.AreEqual(userPermissions[0].AccessRoleId, expectedUserAccessRoleId);
            
            Assert.That(userPermissions[1], Is.Not.Null);
            Assert.AreEqual(userPermissions[1].Id, expectedSecondPermissionId);
            Assert.AreEqual(userPermissions[1].AccessRoleId, expectedUserAccessRoleId);
        }

        [Test]
        [Order(4)]
        public void Method_GetByLogin()
        {
            // arrange

            // act
            User user = _usersRepository.GetUser(_userLogin);

            //assert
            Assert.That(user, Is.Not.Null);
        }

        [Test]
        [Order(5)]
        public void Method_GetCountPermissionsByRole()
        {
            // arrange

            // act
            Int32 countPermissions = _usersRepository.GetCountPermissionsByRoleId(_permissionAccessRoleId);

            //assert
            Assert.AreEqual(2, countPermissions);
        }

        [Test]
        [Order(6)]
        public void Method_GetUsers()
        {
            // arrange
            Guid[] userIds = { _userId };

            // act
            User[] users = _usersRepository.GetUsers(userIds);

            //assert
            Assert.That(users, Is.Not.Null);
            Assert.AreEqual(users.Length, 1);
            Assert.That(users[0], Is.Not.Null);
            Assert.That(userIds.Contains(users[0].Id));
        }

        [Test]
        [Order(7)]
        public void Method_SearchUsers_Success()
        {
            // arrange
            String searchString = "ad";

            // act
            User[] users = _usersRepository.SearchUsers(searchString);

            //assert
            Assert.That(users, Is.Not.Null);
            Assert.AreEqual(users.Length, 1);
            Assert.That(users[0], Is.Not.Null);
        }

        [Test]
        [Order(8)]
        public void Method_SearchUsers_Fail()
        {
            // arrange
            String searchString = "te";

            // act
            User[] users = _usersRepository.SearchUsers(searchString);

            //assert
            Assert.That(users, Is.Not.Null);
            Assert.AreEqual(users.Length, 0);
        }

        [Test]
        [Order(9)]
        public void Method_GetUsersPaged()
        {
            // arrange
            Int32 page = 1;
            Int32 count = 10;

            // act
            PagedResult<User> users = _usersRepository.GetUsersPaged(page, count);

            //assert
            Assert.IsNotNull(users);
            Assert.AreEqual(users.TotalRows, 1);
            Assert.AreEqual(users.Values[0].Id, _userId);
        }

        [Test]
        [Order(10)]
        public void Method_RemoveUser()
        {
            // arrange
            Guid userId = _userId;

            // act
            _usersRepository.RemoveUser(userId, _systemUserId);
            User[] users = _usersRepository.GetUsers(new Guid[] { userId });

            //assert
            Assert.AreEqual(0, users.Length);
        }
    }
}