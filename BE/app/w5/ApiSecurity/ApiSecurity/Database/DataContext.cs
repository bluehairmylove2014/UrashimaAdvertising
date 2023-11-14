using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using ApiSecurity.Database.Models;

namespace ApiSecurity.Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<ApiSecurity.Database.Models.Actor> Actor { get; set; } = default!;

    }
}
