using GC.Tools.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GC.Domain.Users.UserAccessRoles
{
    public class UserAccessRoleBlank : IValidatableObject
    {
        public Guid? Id { get; set; }
        public String? Title { get; set; }
        public String[] AccessPolicies { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();

            if (String.IsNullOrWhiteSpace(Title)) errors.AddError("Название роли пустое, либо имеет некорректное значение");
            if (AccessPolicies.Length == 0) errors.AddError("Необходимо выбрать хотя бы одно разрешение для создания роли");

            return errors;
        }
    }
}
