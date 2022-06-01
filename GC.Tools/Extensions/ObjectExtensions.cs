using GC.Tools.Types.Results;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GC.Tools.Extensions
{
    public static class ObjectExtensions
    {
        public static Boolean IsValid(this object value, out Result result, params object[] items)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(value, items.ToDictionary(i => i, i => i));

            Boolean validationResult = Validator.TryValidateObject(value, context, results, true);
            result = validationResult ? Result.Success() : Result.Fail(results.Select(r => new Error(r.ErrorMessage)));

            return validationResult;
        }
    }
}
