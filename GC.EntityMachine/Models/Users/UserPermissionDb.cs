using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Users
{
    [Table("us_userpermissions")]
    public class UserPermissionDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("userid")]
        public Guid UserId { get; set; }

        [Column("useraccessroleid")]
        public Guid UserAccessRoleId { get; set; }

        [Column("lastmodifieddatetime")]
        public DateTime ModifiedDateTimeUtc { get; set; }

        public UserPermissionDb() { }

        public UserPermissionDb(Guid id, Guid userId, Guid userAccessRoleId, DateTime modifiedDateTimeUtc)
        {
            Id = id;
            UserId = userId;
            UserAccessRoleId = userAccessRoleId;
            ModifiedDateTimeUtc = modifiedDateTimeUtc;
        }
    }
}
