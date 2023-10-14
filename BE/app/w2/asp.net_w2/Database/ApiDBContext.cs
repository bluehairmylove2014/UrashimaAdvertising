using asp.net_w2.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace asp.net_w2.Database
{
    public class ApiDBContext: DbContext
    {
        public ApiDBContext(DbContextOptions<ApiDBContext> options) : base(options) { }
        public DbSet<Actor> Actor { get; set; }
        public DbSet<Film> Film { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
