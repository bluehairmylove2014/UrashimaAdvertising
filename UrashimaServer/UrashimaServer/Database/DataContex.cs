using Microsoft.EntityFrameworkCore;
using UrashimaServer.Database.Models;
using UrashimaServer.Models;

namespace UrashimaServer.Database
{
    public class DataContext : DbContext
    {
        public DbSet<AdsPoint> AdsPoints { get; set; }
        public DbSet<AdsBoard> AdsBoards { get; set; }
        public DbSet<AdsPointImage> AdsPointImages { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<ReportImage> ReportImages { get; set; }
        public DbSet<ReportLoc> ReportLoc { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AdsPointImage>()
                .HasOne<AdsPoint>(e => e.AdsPoint)
                .WithMany(adsPoint => adsPoint.Images)
                .HasForeignKey(e => e.AdsPointId)
                .IsRequired();

            modelBuilder.Entity<AdsBoard>()
                .HasOne<AdsPoint>(e => e.AdsPoint)
                .WithMany(adsPoint => adsPoint.AdsBoards)
                .HasForeignKey(e => e.AdsPointId)
                .IsRequired();

            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasOne<AdsBoard>(e => e.AdsBoard)
                    .WithMany(adsBoard => adsBoard.Reports)
                    .HasForeignKey(e => e.AdsBoardId);

                entity.HasOne<ReportLoc>(e => e.ReportLoc)
                    .WithMany(reportLoc => reportLoc.Reports)
                    .HasForeignKey(e => e.ReportLocId);
            });

            modelBuilder.Entity<ReportImage>()
                .HasOne<Report>(e => e.Report)
                .WithMany(report => report.ReportImages)
                .HasForeignKey(e => e.ReportId)
                .IsRequired();
        }
    }
}
