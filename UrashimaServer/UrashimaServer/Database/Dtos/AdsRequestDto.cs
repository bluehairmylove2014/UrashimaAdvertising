using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;
using UrashimaServer.Utility;

namespace UrashimaServer.Database.Dtos
{
    public class AdsCreateRequestBoardDto
    {
        [Required]
        public int Id { get; set; }
        public string AdsType { get; set; } = string.Empty;
        [Range(1, int.MaxValue)]
        public int Width { get; set; }
        [Range(1, int.MaxValue)]
        public int Height { get; set; }
        [ImageCheck]
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }

    public class AdsCreateRequestPointDto
    {
        [Required]
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
        public bool IsEmpty { get; set; }
    }

    public class AdsCreateBoardRequestDto
    {
        [Required]
        public int AdsPointId { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }

        public AdsCreateRequestBoardDto? AdsBoard { get; set; }
    }

    public class AdsCreatePointRequestDto
    {
        [Required]
        public int Id { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }

        public AdsCreateRequestPointDto? AdsPoint { get; set; }
    }

    public class GetAdsCreateRequestDto
    {
        [Required]
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }
        public string RequestStatus { get; set; } = string.Empty;
        public AdsCreateRequestPointDto? AdsPoint { get; set; }
        public AdsCreateRequestBoardDto? AdsBoard { get; set; }
    }

    public class PostApproveAdsModifyRequest
    {
        [Required]
        public int Id { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
