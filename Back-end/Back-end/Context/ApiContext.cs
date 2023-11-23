using Back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Context
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<Account> Account { get; set; }
        public DbSet<AdsBoard> AdsBoard { get; set; }
        public DbSet<AdsCompanyRequest> AdsCompanyRequest { get; set; }
        public DbSet<AdsModifyRequest> AdsModifyRequest { get; set; }
        public DbSet<AdsPoint> AdsPoint { get; set; }
        public DbSet<ImgList> ImgList { get; set; }
        public DbSet<Report> Report { get; set; }


    }
}
