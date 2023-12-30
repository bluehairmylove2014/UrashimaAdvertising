using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Models
{
    public class AdsFormType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
