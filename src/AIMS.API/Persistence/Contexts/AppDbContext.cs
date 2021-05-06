using AIMS.API.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace AIMS.API.Persistence.Contexts {
    public class AppDbContext : DbContext {
        public virtual DbSet<Asset> Asset { get; set; }
        public virtual DbSet<AssetIssuereturn> AssetIssuereturn { get; set; }
        public virtual DbSet<Author> Author { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<User> User { get; set; }

        public AppDbContext (DbContextOptions<AppDbContext> options) : base (options) { }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Asset> (entity => {
                entity.ToTable ("asset");

                entity.Property (e => e.Id)
                    .HasColumnName ("id")
                    .ValueGeneratedNever ();

                entity.Property (e => e.Authorid).HasColumnName ("authorid");

                entity.Property (e => e.RfidCode)
                    .HasColumnName ("rfidcode")
                    .HasMaxLength (250);

                entity.Property (e => e.Assetname)
                    .HasColumnName ("assetname")
                    .HasMaxLength (50);

                entity.Property (e => e.Category).HasColumnName ("category");

                entity.Property (e => e.Coverimage)
                    .HasColumnName ("coverimage")
                    .HasMaxLength (250);
            });

            modelBuilder.Entity<AssetIssuereturn> (entity => {
                entity.ToTable ("asset_issuereturn");

                entity.Property (e => e.Id)
                    .HasColumnName ("id")
                    .ValueGeneratedNever ();

                entity.Property (e => e.Duedate)
                    .HasColumnName ("duedate")
                    .HasColumnType ("datetime");

                entity.Property (e => e.Issuedate)
                    .HasColumnName ("issuedate")
                    .HasColumnType ("datetime");

                entity.Property (e => e.Assetid).HasColumnName ("assetid");

                entity.Property (e => e.Issueto).HasColumnName ("issueto");

                entity.Property (e => e.Returndate)
                    .HasColumnName ("returndate")
                    .HasColumnType ("datetime");

                entity.Property (e => e.Status)
                    .HasColumnName ("status")
                    .HasDefaultValueSql ("((0))");
            });

            modelBuilder.Entity<Author> (entity => {
                entity.ToTable ("author");

                entity.Property (e => e.Id)
                    .HasColumnName ("id")
                    .ValueGeneratedNever ();

                entity.Property (e => e.Authorname)
                    .HasColumnName ("authorname")
                    .HasMaxLength (50);
            });

            modelBuilder.Entity<Category> (entity => {
                entity.ToTable ("category");

                entity.Property (e => e.Id)
                    .HasColumnName ("id")
                    .ValueGeneratedNever ();

                entity.Property (e => e.Categoryname)
                    .HasColumnName ("categoryname")
                    .HasMaxLength (50);
            });

            modelBuilder.Entity<User> (entity => {
                entity.ToTable ("user");

                entity.Property (e => e.Id)
                    .HasColumnName ("id")
                    .ValueGeneratedNever ();

                entity.Property (e => e.Contact)
                    .HasColumnName ("contact")
                    .HasMaxLength (50);

                entity.Property (e => e.Email)
                    .HasColumnName ("email")
                    .HasMaxLength (50);

                entity.Property (e => e.Firstname)
                    .HasColumnName ("firstname")
                    .HasMaxLength (50);

                entity.Property (e => e.Lastname)
                    .HasColumnName ("lastname")
                    .HasMaxLength (50);

                entity.Property (e => e.RfidCode)
                    .HasColumnName ("rfidcode")
                    .HasMaxLength (250);

            });

        }
    }
}