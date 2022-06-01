using GC.Tools.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GC.Domain.Users
{
    public class UserPermissionBlank : IValidatableObject
    {
        public Guid? Id { get; set; }
        public Guid? AccessRoleId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();

            if (AccessRoleId is null) errors.AddError("Пустой идентификатор роли");

            return errors;
        }
    }
}
