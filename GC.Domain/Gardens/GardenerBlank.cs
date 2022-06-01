using GC.Domain.Persons;
using System;
using System.ComponentModel.DataAnnotations;

namespace GC.Domain.Gardens
{
    public class GardenerBlank: FromPersonBlank
    {
        public Guid? Id { get; set; }

        [Required(ErrorMessage = "Укажите имя садовода")]
        public String? FirstName { get; set; }
        public String? MiddleName { get; set; }

        [Required(ErrorMessage = "Укажите фамилию садовода")]
        public String? LastName { get; set; }

        [Required(ErrorMessage = "Укажите участок садовода")]
        public Guid? SectorId { get; set; }
    }
}
