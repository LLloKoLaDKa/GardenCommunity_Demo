using GC.Domain.AccessPolicies;
using GC.Domain.Users.UserAccessRoles;
using GC.Tests.RepositorySetups;
using NUnit.Framework;
using System;

namespace GC.Tests
{
    internal class UserAccessRolesTests : UsersRepositorySetup
    {
        [Test]
        [Order(0)]
        public void Can_Save_UserAccessRole()
        {
            //arrange
            UserAccessRoleBlank roleBlank = new UserAccessRoleBlank();
            roleBlank.Id = _permissionAccessRoleId;
            roleBlank.Title = _userAccessRoleTitle;
            roleBlank.AccessPolicies = _roleAccessPolicies;

            //act
            _usersRepository.SaveUserAccessRole(roleBlank, _systemUserId);

            //assert
            Assert.That(true);
        }

        [Test]
        [Order(1)]
        public void Correctly_Saved_Title()
        {
            Int32 expectedLength = 1;
            String expectedTitle = _userAccessRoleTitle;

            // act
            UserAccessRole[] roles = _usersRepository.GetUserAccessRoles();

            //assert
            Assert.AreEqual(expectedLength, roles.Length);
            Assert.AreEqual(expectedTitle, roles[0].Title);
        }

        [Test]
        [Order(2)]
        public void Correctly_Saved_AccessPolicies()
        {
            Int32 expectedLength = 1;
            AccessPolicy[] expectedArray = Enum.GetValues<AccessPolicy>();

            // act
            UserAccessRole[] roles = _usersRepository.GetUserAccessRoles();

            //assert
            Assert.AreEqual(expectedLength, roles.Length);
            Assert.AreEqual(expectedArray, roles[0].AccessPolicies);
        }

        [Test]
        [Order(3)]
        public void Method_RemoveUserAccessRole()
        {
            //arrange
            Guid userAccessRoleId = _permissionAccessRoleId;

            // act
            _usersRepository.RemoveUserAccessRole(userAccessRoleId, _systemUserId);
            UserAccessRole[] roles = _usersRepository.GetUserAccessRoles();

            //assert
            Assert.That(roles.Length == 0);
        }
    }
}
