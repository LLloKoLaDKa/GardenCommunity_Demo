using GC.Domain.AccessPolicies;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Repositories.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using System;

namespace GC.Tests.RepositorySetups
{
    internal abstract class UsersRepositorySetup
    {
        protected readonly String _userLogin = "admin";
        protected readonly String _userPassword = "password";
        protected readonly String _userAccessRoleTitle = "firstRole";
        protected readonly Guid _userId = Guid.NewGuid();
        protected readonly Guid _systemUserId = Guid.NewGuid();
        protected readonly Guid _firstPermissionId = Guid.NewGuid();
        protected readonly Guid _secondPermissionId = Guid.NewGuid();
        protected readonly Guid _permissionAccessRoleId = Guid.NewGuid();
        protected readonly Guid _userTokenId = Guid.NewGuid();
        protected readonly String[] _roleAccessPolicies = Enum.GetNames<AccessPolicy>();


        protected DbContextOptions<GardenContext> _contextOptions;
        protected UsersRepository _usersRepository;

        [OneTimeSetUp]
        public void Setup()
        {
            IConfiguration configuration = new ConfigurationBuilder()
                       .AddJsonFile($"Configurations/DbConnections/connectionStrings.Tests.json")
                       .Build();

            string connectionString = configuration.GetSection("ConnectionString").Value;
            _contextOptions = new DbContextOptionsBuilder<GardenContext>().UseNpgsql(connectionString).Options;
            _usersRepository = new UsersRepository(_contextOptions);
            _usersRepository.DeleteAllData();
        }
    }
}
