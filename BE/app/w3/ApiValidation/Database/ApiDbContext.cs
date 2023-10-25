using ApiValidation.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiValidation.Database
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Film> Film { get; set; }

    }
}
