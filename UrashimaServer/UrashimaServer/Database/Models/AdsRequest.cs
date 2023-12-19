using System.ComponentModel.DataAnnotations;
using UrashimaServer.Models;

namespace UrashimaServer.Database.Models
{
    public class AdsCreationRequest
    {
        [Key]
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }
        public string RequestStatus { get; set; } = string.Empty;

        public AdsPoint? AdsPoint { get; set; }
        public ICollection<AdsBoard>? AdsBoard { set; get; }
    }
}
