using Microsoft.EntityFrameworkCore;
using LogisticaApp.Models;
using LogisticaApp.Models.Enums;

namespace LogisticaApp.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // DbSets = tablas en la base de datos
    public DbSet<User> Users { get; set; }
    public DbSet<Package> Packages { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Relación: User -> Orders (1 a muchos)
        modelBuilder.Entity<User>()
            .HasMany(u => u.Orders)
            .WithOne(o => o.User)
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Relación: Order -> Packages (1 a muchos)
modelBuilder.Entity<Order>()
    .HasMany(o => o.Packages)
    .WithOne(p => p.Order)
    .HasForeignKey(p => p.OrderId)
    .OnDelete(DeleteBehavior.SetNull);

        // Relación: Order -> OrderItems (1 a muchos)
        modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderItems)
            .WithOne(oi => oi.Order)
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configurar enums como strings en la BD
        modelBuilder.Entity<User>()
            .Property(u => u.Role)
            .HasConversion<string>();

        modelBuilder.Entity<Package>()
            .Property(p => p.Status)
            .HasConversion<string>();

        modelBuilder.Entity<Order>()
            .Property(o => o.Status)
            .HasConversion<string>();
    }
}