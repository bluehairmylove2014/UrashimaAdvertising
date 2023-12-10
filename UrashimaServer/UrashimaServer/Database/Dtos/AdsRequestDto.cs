using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Database.Dtos
{
    public class AdsCreateRequestBoardDto
    {
        public string AdsType { get; set; } = string.Empty;
        public int Width { get; set; }
        public int Height { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }

    public class AdsCreateRequestDto
    {
        public int AdsPointId { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }

        public ICollection<AdsCreateRequestBoardDto>? AdsBoards { set; get; }
    }
}
