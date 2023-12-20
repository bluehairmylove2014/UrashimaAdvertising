﻿using System.ComponentModel.DataAnnotations;
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
        public int Id { get; set; }
        public int AdsPointId { get; set; }
        public string AdsContent { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }

        public ICollection<AdsCreateRequestBoardDto>? AdsBoard { set; get; }
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

        public AdsCreateRequestPointDto? AdsPoint { set; get; }
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
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }
        public AdsCreateRequestPointDto? AdsPoint { set; get; }
        public ICollection<AdsCreateRequestBoardDto>? AdsBoard { set; get; }
        public string RequestAddress { get; set; } = string.Empty;
    }
}