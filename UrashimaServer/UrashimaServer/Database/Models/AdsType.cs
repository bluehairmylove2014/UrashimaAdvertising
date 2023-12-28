using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Models
{
    public class AdsType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
