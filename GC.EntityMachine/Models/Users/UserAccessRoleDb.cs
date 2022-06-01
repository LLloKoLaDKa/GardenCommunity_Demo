using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GC.EntitiesCore.Models.Users
{
    [Table("us_useraccessroles")]
    public class UserAccessRoleDb
    {
        [Column("id")]
        public Guid Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("accesspolicies")]
        public string[] AccessPolicies { get; set; }

        [Column("lastmodifieddatetime")]
        public DateTime LastModifiedDateTime { get; set; }

        [Column("lastmodifieduserid")]
        public Guid LastModifiedUserId { get; set; }

        [Column("isremoved")]
        public bool IsRemoved { get; set; }

        public UserAccessRoleDb() { }

        public UserAccessRoleDb(Guid id, string title, string[] accessPolicies, DateTime lastModifiedDateTime,
            Guid lastModifiedUserId, bool isRemoved)
        {
            Id = id;
            Title = title;
            AccessPolicies = accessPolicies;
            LastModifiedDateTime = lastModifiedDateTime;
            LastModifiedUserId = lastModifiedUserId;
            IsRemoved = isRemoved;
        }
    }
}
