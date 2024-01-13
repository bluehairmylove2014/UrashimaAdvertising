using NuGet.Packaging.Signing;
using System.ComponentModel.DataAnnotations;
using System.IO.Pipelines;
using UrashimaServer.Common.Constant;

namespace UrashimaServer.Utility
{
    public class ImageCheck : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string image = value as string;
            string[] imgType = 
                { ".jpg", ".jpeg", ".png", ".gif", ".bmp" , ".webp", ".svg", ".jfif", ".pjpeg", ".pjp", ".avif", ".apng" };
            var valueType = Path.GetExtension(image)?.ToLower();

            if (imgType.Contains(valueType))
            {
                return ValidationResult.Success;
            }

            return new ValidationResult("Invalid image type");
        }
    }
}
