using ApiValidation.Models;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace ApiValidation
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Property, AllowMultiple = false)]
    public class CustomAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext context) => value is DateTime dateTime && dateTime > DateTime.UtcNow ? ValidationResult.Success :
                new ValidationResult("Date must be in the future");
    }

    public class CreateFilmRequestValidator : AbstractValidator<Film>
    {
        public CreateFilmRequestValidator() {
            RuleFor(x => x.title).Length(3, 10);
            RuleFor(x => x.description).Must((x) => x?.Length > 5);
        }
    }

    public class GetSpecificFilm
    {
        [Range(1, 10)]
        public int id { get; set; }
    }
}
