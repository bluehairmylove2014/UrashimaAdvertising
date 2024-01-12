using System.ComponentModel.DataAnnotations;
using UrashimaServer.Common.Constant;

namespace UrashimaServer.Utility
{
    public class RoleCheck : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string role = value as string;

            if (role == GlobalConstant.WardOfficer || role == GlobalConstant.DistrictOfficer || role == GlobalConstant.HeadQuater)
            {
                return ValidationResult.Success;
            }

            return new ValidationResult("Invalid role");
        }
    }
}
