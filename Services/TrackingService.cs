using LogisticaApp.Data;
using LogisticaApp.Models;
using Microsoft.EntityFrameworkCore;

namespace LogisticaApp.Services;

public class TrackingService
{
    private readonly AppDbContext _context;

    public TrackingService(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Obtiene toda la info de tracking para el cliente
    /// </summary>
    public async Task<TrackingResponse?> GetTrackingAsync(string trackingNumber)
    {
        var package = await _context.Packages
            .AsNoTracking()
            .Include(p => p.Driver)
            .FirstOrDefaultAsync(p => p.TrackingNumber == trackingNumber);

        if (package == null)
            return null;

        return new TrackingResponse
        {
            TrackingNumber = package.TrackingNumber,
            ProductName = package.ProductName,
            Status = package.Status.ToString(),
            CreatedAt = package.CreatedAt,
            DeliveredAt = package.DeliveredAt,
            CurrentLatitude = package.CurrentLatitude,
            CurrentLongitude = package.CurrentLongitude,
            DriverName = package.Driver?.Username ?? "Sin asignar",
            DestinationName = package.DestinationName
        };
    }
}

public class TrackingResponse
{
    public string TrackingNumber { get; set; }
    public string ProductName { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DeliveredAt { get; set; }
    public double? CurrentLatitude { get; set; }
    public double? CurrentLongitude { get; set; }
    public string DriverName { get; set; }
    public string DestinationName { get; set; }
}