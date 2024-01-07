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
        public DbSet<Location> Locations { get; set; }
        public DbSet<AdsCreationRequest> AdsCreationRequests { get; set; }
        public DbSet<PointModify> PointModifies { get; set; }
        public DbSet<BoardModify> BoardModifies { get; set; }
        public DbSet<PointModifyImage> PointModifyImages { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<WardDistrict> WardDistricts { get; set; }
        public DbSet<ReportType> ReportTypes { get; set; }
        public DbSet<AdsType> AdsTypes { get; set; }
        public DbSet<LocationType> LocationTypes { get; set; }
        public DbSet<AdsFormType> AdsFormTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Connection> Connections { get; set; }

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
                .HasOne(e => e.AdsPoint)
                .WithMany(adsPoint => adsPoint.Images)
                .HasForeignKey(e => e.AdsPointId)
                .IsRequired();

            modelBuilder.Entity<AdsBoard>()
                .HasOne(e => e.AdsPoint)
                .WithMany(adsPoint => adsPoint.AdsBoard)
                .HasForeignKey(e => e.AdsPointId)
                .IsRequired();

            modelBuilder.Entity<AdsBoard>()
                .HasOne<AdsCreationRequest>(e => e.AdsCreateRequest)
                .WithOne(req => req.AdsBoard)
                .HasForeignKey<AdsBoard>(e => e.AdsCreateRequestId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasOne(e => e.AdsBoard)
                    .WithMany(adsBoard => adsBoard.Reports)
                    .HasForeignKey(e => e.AdsBoardId);

                entity.HasOne(e => e.Location)
                    .WithMany(location => location.Reports)
                    .HasForeignKey(e => e.LocationId);

                entity.HasOne(e => e.AdsPoint)
                    .WithMany(adsPoint => adsPoint.Reports)
                    .HasForeignKey(e => e.AdsPointId);
            });

            modelBuilder.Entity<ReportImage>()
                .HasOne(e => e.Report)
                .WithMany(report => report.Images)
                .HasForeignKey(e => e.ReportId)
                .IsRequired();

            modelBuilder.Entity<Account>();


            modelBuilder.Entity<AdsPoint>()
                .HasOne<AdsCreationRequest>(e => e.AdsCreateRequest)
                .WithOne(req => req.AdsPoint)
                .HasForeignKey<AdsPoint>(e => e.AdsCreateRequestId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<BoardModify>()
                .HasOne(e => e.AdsPoint)
                .WithMany(adsPoint => adsPoint.AdsBoard)
                .HasForeignKey(e => e.AdsPointId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<PointModifyImage>()
                .HasOne(e => e.AdsPoint)
                .WithMany(adsPoint => adsPoint.Images)
                .HasForeignKey(e => e.AdsPointId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
