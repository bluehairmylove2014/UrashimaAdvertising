using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UrashimaServer.Database.Models
{
    public class AdsCreationRequest
    {
        public int Id { get; set; }
        public int PointID { get; set; }
        public string AdsContent { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set;}
        public string Phone { get; set;}
        public string Address { get; set;}
        public DateTime ContractStart { get; set; }
        public DateTime ContractEnd { get; set; }
        public string RequestStatus { get; set; }
    }
}