using Microsoft.EntityFrameworkCore;
using ServerB.Database.Models;

namespace ServerB.Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<ServerB.Database.Models.Film> Film { get; set; } = default!;

    }
}
