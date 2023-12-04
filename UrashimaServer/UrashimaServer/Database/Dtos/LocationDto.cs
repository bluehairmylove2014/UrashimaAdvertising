namespace UrashimaServer.Database.Dtos
{
    public class InputGeoCodeDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }


    public class GeoCodeResultDto
    {
        public string? Distance { get; set; }
        public int Elevation { get; set; }
        public string? State { get; set; }
        public double Latt { get; set; }
        public string? City { get; set; }
        public string? Prov { get; set; }
        public string? Geocode { get; set; }
        public string? Geonumber { get; set; }
        public string? Country { get; set; }
        public int Stnumber { get; set; }
        public string? Staddress { get; set; }
        public string? Timezone { get; set; }
        public string? Region { get; set; }
        public double Postal { get; set; }
        public double Longt { get; set; }
        public int Remaining_credits { get; set; }
        public double Confidence { get; set; }
    }
}
