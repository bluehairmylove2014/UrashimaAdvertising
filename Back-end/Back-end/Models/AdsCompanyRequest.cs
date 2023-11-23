namespace Back_end.Models
{
    public class AdsCompanyRequest
    {
        public string AdsContent { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set;}
        public string Phone { get; set;}
        public string Address { get; set;}
        public DateTime ContractStart { get; set;}
        public DateTime ContractEnd { get; set;}
        public string RequestStatus { get; set;}
    }
}
