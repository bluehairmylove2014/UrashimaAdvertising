﻿using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Models
{
    public class LocationType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
