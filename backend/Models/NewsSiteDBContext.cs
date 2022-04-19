using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace NewsWebsite.Models
{
    public partial class NewsSiteDBContext : DbContext
    {
        public NewsSiteDBContext()
        {
        }

        public NewsSiteDBContext(DbContextOptions<NewsSiteDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Agency> Agencies { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Reporter> Reporters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=NewsSiteDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Agency>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<News>(entity =>
            {
                entity.HasIndex(e => e.CategoryId, "IX_News_CategoryID");

                entity.HasIndex(e => e.ReporterId, "IX_News_ReporterID");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.ReporterId).HasColumnName("ReporterID");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.CategoryId);

                entity.HasOne(d => d.Reporter)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.ReporterId);
            });

            modelBuilder.Entity<Reporter>(entity =>
            {
                entity.HasIndex(e => e.AgencyId, "IX_Reporters_AgencyID");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AgencyId).HasColumnName("AgencyID");

                entity.HasOne(d => d.Agency)
                    .WithMany(p => p.Reporters)
                    .HasForeignKey(d => d.AgencyId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
