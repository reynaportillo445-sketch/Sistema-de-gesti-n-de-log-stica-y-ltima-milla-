using Microsoft.EntityFrameworkCore;
using MiProyectoApi.Models;
namespace MiProyectoApi.DATA
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
    }
}