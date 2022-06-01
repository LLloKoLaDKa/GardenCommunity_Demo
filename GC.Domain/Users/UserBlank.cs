using GC.Tools.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GC.Domain.Users
{
    public class UserBlank : IValidatableObject
    {
        public Guid? Id { get; set; }
        public String? Login { get; set; }
        public String? Password { get; set; }
        public String? RePassword { get; set; }
        public Boolean? PasswordWasEdited { get; set; }
        public UserPermissionBlank[] Permissions { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();

            if (String.IsNullOrWhiteSpace(Login)) errors.AddError("Логин пуст, либо содержит некорректное значение");

            if(Id is null)
            {
                if (String.IsNullOrWhiteSpace(Password)) errors.AddError("Пароль пуст, либо содержит некорретное значение");
                if (String.IsNullOrWhiteSpace(RePassword)) errors.AddError("Повторение пароля пусто, либо содержит некорретное значение");
                if (Password != RePassword) errors.AddError("Пароли не совпадают");
            }
            else
            {
                if (!String.IsNullOrEmpty(Password) || !String.IsNullOrEmpty(RePassword))
                {
                    if (Password != RePassword) errors.AddError("Пароли не совпадают");
                }
            }

            if (Permissions is null || Permissions.Length == 0) errors.AddError("Не указан список ролей пользователя");

            return errors;
        }
    }
}
