using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GC.Tools.Extensions
{
    public static class ValidationResultExtensions
    {
        public static List<ValidationResult> AddError(this List<ValidationResult> items, String errorMessage)
        {
            items.Add(new ValidationResult(errorMessage));
            return items;
        }
        
        public static List<ValidationResult> AddErrorRange(this List<ValidationResult> items, IEnumerable<String> errorMessages)
        {
            items.AddRange(errorMessages.Select(em => new ValidationResult(em)));
            return items;
        }
    }
}
