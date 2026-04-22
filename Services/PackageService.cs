using LogisticaApp.Data;
using LogisticaApp.Models;
using LogisticaApp.Models.Enums;
using LogisticaApp.StateMachine;
using Microsoft.EntityFrameworkCore;

namespace LogisticaApp.Services;

public class PackageService
{
    private readonly AppDbContext _context;
    private readonly PackageStateMachine _stateMachine;

    public PackageService(AppDbContext context)
    {
        _context = context;
        _stateMachine = new PackageStateMachine();
    }

    // Crear un paquete nuevo
    public async Task<Package> CreatePackageAsync(Package package)
    {
        package.PackageId = Guid.NewGuid();
        package.TrackingNumber = package.PackageId.ToString()[..8].ToUpper(); // UUID corto
        package.Status = PackageStatus.Created;
        package.CreatedAt = DateTime.UtcNow;

        _context.Packages.Add(package);
        await _context.SaveChangesAsync();

        return package;
    }

    // Asignar driver a un paquete
    public async Task<(bool Success, string Message)> AssignDriverAsync(Guid packageId, int driverId)
    {
        var package = await _context.Packages.FindAsync(packageId);
        if (package == null)
            return (false, "Paquete no encontrado");

        var driver = await _context.Users.FirstOrDefaultAsync(u => u.UserId == driverId && u.Role == UserRole.Driver);
        if (driver == null)
            return (false, "Driver no válido");

        package.DriverId = driverId;

        await _context.SaveChangesAsync();

        return (true, "Driver asignado correctamente");
    }

    // Obtener un paquete por tracking number (PÚBLICO, sin autenticación)
    public async Task<Package?> GetPackageByTrackingAsync(string trackingNumber)
    {
        return await _context.Packages
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.TrackingNumber == trackingNumber);
    }

    public async Task<List<Package>> GetPackagesByDriverAsync(int driverId)
{
    return await _context.Packages
        .Where(p => p.DriverId == driverId)
        .ToListAsync();
}

    // Obtener paquete por ID
    public async Task<Package?> GetPackageByIdAsync(Guid id)
    {
        return await _context.Packages
            .Include(p => p.Driver)
            .FirstOrDefaultAsync(p => p.PackageId == id);
    }

    // Actualizar estado (con validación de máquina de estados)
    public async Task<(bool Success, string Message, Package? Package)> UpdateStatusAsync(Guid packageId, PackageStatus newStatus)
    {
        var package = await _context.Packages.FindAsync(packageId);

        if (package == null)
            return (false, "❌ Paquete no encontrado", null);

        // Validar transición
        if (!_stateMachine.CanTransition(package.Status, newStatus))
            return (false, $"❌ No se puede cambiar de {package.Status} a {newStatus}", package);

        package.Status = newStatus;

        // Si se entrega, guardar timestamp
        if (newStatus == PackageStatus.Delivered)
            package.DeliveredAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return (true, "✅ Estado actualizado", package);
    }

    // Obtener todos los paquetes (admin)
    public async Task<List<Package>> GetAllPackagesAsync()
    {
        return await _context.Packages
        .Include(p => p.Driver)
        .ToListAsync();
    }
}