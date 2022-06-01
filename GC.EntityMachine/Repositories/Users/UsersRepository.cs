using GC.Domain.Users;
using GC.Domain.Users.UserAccessRoles;
using GC.EntitiesCore.Context;
using GC.EntitiesCore.Extensions;
using GC.EntitiesCore.Models.Users;
using GC.EntitiesCore.Models.Users.Converters;
using GC.Tools.Cryptography;
using GC.Tools.Types.Results;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("GC.Tests")]

namespace GC.EntitiesCore.Repositories.Users
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DbContextOptions<GardenContext> _contextOptions;

        public UsersRepository(DbContextOptions<GardenContext> contextOptions)
        {
            _contextOptions = contextOptions;
        }

        #region UserAccessRoles

        public void SaveUserAccessRole(UserAccessRoleBlank roleBlank, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                UserAccessRoleDb roleDb = roleBlank.ToUserAccessRoleDb(systemUserId);

                context.Attach(roleDb);
                context.UserAccesRoles.AddOrUpdate(roleDb);
                context.SaveChanges();
            });
        }

        public UserAccessRole[] GetUserAccessRoles()
        {
            return _contextOptions.UseContext(context =>
            {
                return context.UserAccesRoles
                    .Where(uac => !uac.IsRemoved)
                    .OrderByDescending(a => a.Title)
                    .ToUserAccessRoles();
            });
        }

        public void RemoveUserAccessRole(Guid roleId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                UserAccessRoleDb roledb = context.UserAccesRoles.FirstOrDefault(uac => uac.Id == roleId);
                roledb.IsRemoved = true;

                context.Entry(roledb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        #endregion UserAccessRoles

        #region UserPermissions

        public int GetCountPermissionsByRoleId(Guid roleId)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.UserPermissions.Where(up => up.UserAccessRoleId == roleId).Count();
            });
        }

        public UserPermission[] GetUserPermissions(Guid userId)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.UserPermissions
                .Where(up => up.UserId == userId)
                .OrderByDescending(a => a.ModifiedDateTimeUtc)
                .ToUserPermissions();
            });
        }

        #endregion UserPermissions

        #region Users

        public void SaveUser(UserBlank userBlank, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                UserDb newUserDb = userBlank.ToUserDb(Cryptor.Encrypt(userBlank.Password), systemUserId);
                UserDb userDb = context.Users.FirstOrDefault(u => u.Id == userBlank.Id);
                if (userDb is not null)
                {
                    userDb.Clone(newUserDb, userBlank.PasswordWasEdited.Value);
                    context.Entry(userDb).State = EntityState.Modified;
                }
                else
                {
                    userDb = newUserDb;
                    context.Attach(userDb);
                    context.Users.AddOrUpdate(userDb);
                }

                UserPermissionDb[] deletablePermissions = context.UserPermissions.Where(up => up.UserId == userDb.Id).ToArray();
                context.RemoveRange(deletablePermissions);

                Boolean containSuperRole = deletablePermissions.FirstOrDefault(p => p.UserAccessRoleId == UserAccessRole.SuperRoleId) != null;
                if (containSuperRole) userBlank.Permissions.ToList().Add(new UserPermissionBlank { Id = Guid.NewGuid(), AccessRoleId = UserAccessRole.SuperRoleId });

                foreach (UserPermissionBlank permissionBlank in userBlank.Permissions)
                {
                    UserPermissionDb permissionDb = permissionBlank.ToUserPermissionDb(userDb.Id);
                    context.UserPermissions.Add(permissionDb);
                }

                context.SaveChanges();
            });
        }

        public User GetUser(Guid userId)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Users.FirstOrDefault(u => u.Id == userId && !u.IsRemoved)?.ToUser();
            });
        }

        public User GetUser(string login)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Users.FirstOrDefault(u => u.Login == login && !u.IsRemoved)?.ToUser();
            });
        }

        public User GetUser(string login, string passwordHash)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Users.FirstOrDefault(u => u.Login == login && u.PasswordHash == passwordHash && !u.IsRemoved)?.ToUser();
            });
        }

        public User[] GetUsers(Guid[] userIds)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Users.Where(u => userIds.Contains(u.Id) && !u.IsRemoved).OrderByDescending(a => a.Login).ToUsers();
            });
        }
        public User[] SearchUsers(string login)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.Users
                    .Where(u => u.Login.ToLower().Contains(login.ToLower()) && !u.IsRemoved)
                    .OrderByDescending(a => a.Login)
                    .ToUsers();
            });
        }

        public PagedResult<User> GetUsersPaged(int page, int count)
        {
            return _contextOptions.UseContext(context =>
            {
                page.GetOffset(ref count, out int offset);

                User[] users = context.Users.Where(u => !u.IsRemoved).OrderBy(u => u.Login).Skip(offset).Take(count).ToUsers();
                Int32 totalRows = context.Users.Where(u => !u.IsRemoved).OrderByDescending(a => a.Login).Count();
                return new PagedResult<User>(users.ToList(), totalRows);
            });
        }

        public void RemoveUser(Guid userId, Guid systemUserId)
        {
            _contextOptions.UseContext(context =>
            {
                UserDb userDb = context.Users.FirstOrDefault(u => u.Id == userId);
                userDb.IsRemoved = true;

                context.Entry(userDb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        #endregion Users

        #region UserTokens

        public void SaveToken(UserToken token, DateTime expiredDateTime)
        {
            _contextOptions.UseContext(context =>
            {
                UserTokenDb tokenDb = token.ToUserTokenDb(expiredDateTime);

                context.Attach(tokenDb);
                context.UserTokens.AddOrUpdate(tokenDb);
                context.SaveChanges();
            });
        }

        public UserToken GetToken(Guid tokenId)
        {
            return _contextOptions.UseContext(context =>
            {
                return context.UserTokens.FirstOrDefault(ut => ut.Id == tokenId && ut.ExpiredDateTimeUtc > DateTime.Now)?.ToUserToken();
            });
        }

        public void UpdateTokenPermission(Guid tokenId, Guid permissionId)
        {
            _contextOptions.UseContext(context =>
            {
                UserTokenDb tokenDb = context.UserTokens.FirstOrDefault(ut => ut.Id == tokenId);
                tokenDb.PermissionId = permissionId;

                context.Entry(tokenDb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        public void UpdateTokenExpiredDateTime(Guid tokenId, DateTime expiredDateTime)
        {
            _contextOptions.UseContext(context =>
            {
                UserTokenDb tokenDb = context.UserTokens.FirstOrDefault(ut => ut.Id == tokenId);
                tokenDb.ExpiredDateTimeUtc = expiredDateTime;

                context.Entry(tokenDb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        public void ClearTokenPermission(Guid tokenId)
        {
            _contextOptions.UseContext(context =>
            {
                UserTokenDb tokenDb = context.UserTokens.FirstOrDefault(ut => ut.Id == tokenId);
                tokenDb.PermissionId = null;

                context.Entry(tokenDb).State = EntityState.Modified;
                context.SaveChanges();
            });
        }

        public void RemoveToken(Guid tokenId)
        {
            _contextOptions.UseContext(context =>
            {
                UserTokenDb tokenDb = context.UserTokens.FirstOrDefault(ut => ut.Id == tokenId);

                context.UserTokens.Remove(tokenDb);
                context.SaveChanges();
            });
        }

        #endregion UserTokens

        #region Tests

        internal void DeleteAllData()
        {
            _contextOptions.UseContext(context =>
            {
                context.Users.RemoveRange(context.Users);
                context.UserPermissions.RemoveRange(context.UserPermissions);
                context.UserAccesRoles.RemoveRange(context.UserAccesRoles);
                context.UserTokens.RemoveRange(context.UserTokens);
                context.Configurations.RemoveRange(context.Configurations);

                context.SaveChanges();
            });
        }

        #endregion Tests
    }
}
