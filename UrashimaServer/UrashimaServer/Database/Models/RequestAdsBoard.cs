using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UrashimaServer.Database.Models
{
    public class RequestAdsBoard
    {
        [Key]
        public int Id { get; set; }
        public int PointID { get; set;}
        public int BoardID { get; set;}
        public string status { get; set; }
    }
}