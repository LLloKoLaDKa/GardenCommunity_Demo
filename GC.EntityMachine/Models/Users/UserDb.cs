using GC.Domain.Users;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Users
{
    [Table("us_users")]
    public class UserDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("login")]
        public string Login { get; set; }

        [Column("passwordhash")]
        public string PasswordHash { get; set; }

        [Column("lastmodifieddatetime")]
        public DateTime ModifiedDateTime { get; set; }

        [Column("lastmodifieduserid")]
        public Guid ModifiedUserId { get; set; }

        [Column("isremoved")]
        public bool IsRemoved { get; set; }

        public UserDb() { }

        public UserDb(Guid id, string login, string passwordHash, DateTime modifiedDateTime,
            Guid modifiedUserId, bool isRemoved)
        {
            Id = id;
            Login = login;
            PasswordHash = passwordHash;
            ModifiedDateTime = modifiedDateTime;
            ModifiedUserId = modifiedUserId;
            IsRemoved = isRemoved;
        }

        internal void Clone(UserDb userDb, bool passwordWasEdited = false)
        {
            Login = userDb.Login;
            PasswordHash = passwordWasEdited ? userDb.PasswordHash : PasswordHash;
            ModifiedDateTime = userDb.ModifiedDateTime;
            ModifiedUserId = userDb.ModifiedUserId;
            IsRemoved = userDb.IsRemoved;

        }
    }
}
