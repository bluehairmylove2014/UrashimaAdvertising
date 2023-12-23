namespace UrashimaServer.Database.Dtos
{
    public class LocationBasicDto
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
    }

    public class InputGeoCodeDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public class AddressResultDto
    {
        public string? Amenity { get; set; }
        public string? House_number { get; set; }
        public string? Road { get; set; }
        public string? Suburb { get; set; }
        public string? Town { get; set; }
        public int? Postcode { get; set; }
        public string? Country { get; set; }
        public string? Country_code { get; set; }
    }

    public class GeoCodeResult
    {
        public double? Lat { get; set; }
        public double? Lon { get; set; }
        public string? Display_name { get; set; }
        public AddressResultDto? Address { get; set; }
    }

    public class GeoCodeResultDto
    {
        public double? Latt { get; set; }
        public double? Longt { get; set; }
        public string? Display_name { get; set; }
        public string? Amenity { get; set; }
        public string? House_number { get; set; }
        public string? Road { get; set; }
        public string? Suburb { get; set; }
        public string? Town { get; set; }
        public int? Postcode { get; set; }
        public string? Country { get; set; }
        public string? Country_code { get; set; }
    }
}
