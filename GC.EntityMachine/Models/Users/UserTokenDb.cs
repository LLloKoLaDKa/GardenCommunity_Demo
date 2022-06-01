using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Users
{
    [Table("us_usertokens")]
    public class UserTokenDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("userid")]
        public Guid UserId { get; set; }

        [Column("permissionid")]
        public Guid? PermissionId { get; set; }

        [Column("expireddatetime")]
        public DateTime ExpiredDateTimeUtc { get; set; }

        [Column("lastmodifieddatetime")]
        public DateTime ModifiedDateTimeUtc { get; set; }

        public UserTokenDb() { }

        public UserTokenDb(Guid id, Guid userId, Guid? permissionId, DateTime expiredDateTimeUtc, DateTime modifiedDateTimeUtc)
        {
            Id = id;
            UserId = userId;
            PermissionId = permissionId;
            ExpiredDateTimeUtc = expiredDateTimeUtc;
            ModifiedDateTimeUtc = modifiedDateTimeUtc;
        }
    }
}
