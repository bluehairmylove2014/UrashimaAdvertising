using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Dtos
{
    public class LocationBasicDto
    {
        [Required]
        public int Id { get; set; }
        [Range(-90, 90)]
        public double Latitude { get; set; }
        [Range(-180, 180)]
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
    }

    public class InputGeoCodeDto
    {
        [Range(-90, 90)]
        public double Latitude { get; set; }
        [Range(-180, 180)]
        public double Longitude { get; set; }
    }

    public class AddressResultDto
    {
        public string? Amenity { get; set; }
        public string? House_number { get; set; }
        public string? Road { get; set; }
        public string? Quarter { get; set; }
        public string? Suburb { get; set; }
        public string? City { get; set; }
        public string? Town { get; set; }
        public int? Postcode { get; set; }
        public string? Country { get; set; }
        public string? Country_code { get; set; }
    }

    public class GeoCodeResult
    {
        [Range(-90, 90)]
        public double? Lat { get; set; }
        [Range(-180, 180)]
        public double? Lon { get; set; }
        public string? Display_name { get; set; }
        public AddressResultDto? Address { get; set; }
    }

    public class GeoCodeResultDto
    {
        [Range(-90, 90)]
        public double? Latt { get; set; }
        [Range(-180, 180)]
        public double? Longt { get; set; }
        public string? Display_name { get; set; }
        public string? Amenity { get; set; }
        public string? House_number { get; set; }
        public string? Road { get; set; }
        public string? Quarter { get; set; }
        public string? Suburb { get; set; }
        public string? City { get; set; }
        public string? Town { get; set; }
        public int? Postcode { get; set; }
        public string? Country { get; set; }
        public string? Country_code { get; set; }
    }
}
