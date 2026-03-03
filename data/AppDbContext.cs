using Microsoft.EntityFrameworkCore;
using proyectoequipo.ORM.Models;

namespace proyectoequipo.ORM.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
}