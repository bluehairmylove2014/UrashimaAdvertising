using System.ComponentModel.DataAnnotations;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Database.Dtos
{
    public class AdsCreateRequestBoardDto
    {
        public int Id { get; set; }
        public string AdsType { get; set; } = string.Empty;
        public int Width { get; set; }
        public int Height { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }

    public class AdsCreateRequestPointDto
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public string LocationType { get; set; } = string.Empty;
        public string AdsForm { get; set; } = string.Empty;
        public bool Planned { get; set; }
    }

    public class AdsCreateBoardRequestDto
    {
        public int AdsPointId { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }

        public AdsCreateRequestBoardDto? AdsBoard { get; set; }
    }

    public class AdsCreatePointRequestDto
    {
        public int Id { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }

        public AdsCreateRequestPointDto? AdsPoint { get; set; }
    }

    public class GetAdsCreateRequestDto
    {
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public bool IsEmpty { get; set; }
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }
        public string RequestStatus { get; set; } = string.Empty;
        public AdsCreateRequestPointDto? AdsPoint { get; set; }
        public AdsCreateRequestBoardDto? AdsBoard { get; set; }
    }

    public class PostApproveAdsModifyRequest
    {
        public int Id { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
