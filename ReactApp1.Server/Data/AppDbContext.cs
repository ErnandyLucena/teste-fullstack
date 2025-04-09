using Microsoft.EntityFrameworkCore;
using SeuProjeto.Models;

namespace SeuProjeto.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Beneficiario> Beneficiarios { get; set; }
        public DbSet<Atendimento> Atendimentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Beneficiario>()
                .HasMany(b => b.Atendimentos)
                .WithOne(a => a.Beneficiario)
                .HasForeignKey(a => a.BeneficiarioId);
        }
    }
}
