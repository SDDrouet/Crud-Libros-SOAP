namespace backend_soap.Data
{
    using backend_soap.Entity;
    using Microsoft.EntityFrameworkCore;

    public class LibraryContext : DbContext
    {
        public DbSet<Libro> Libros { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost,1433;Database=libros;User Id=SA;Password=Distribuidas@123;TrustServerCertificate=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Libro>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nombre).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Autor).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Resumen).IsRequired().HasMaxLength(500);
                entity.Property(e => e.Anio).IsRequired();
            });
        }
    }
}
