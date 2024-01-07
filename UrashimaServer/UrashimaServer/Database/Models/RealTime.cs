using System.ComponentModel.DataAnnotations;

namespace UrashimaServer.Database.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; } = string.Empty;
        public ICollection<Connection>? Connections { get; set; }
    }

    public class Connection
    {
        public string ConnectionId { get; set; } = string.Empty;
        public string? UserAgent { get; set; } = string.Empty;
        public bool Connected { get; set; }
    }
}
