using LogisticaApp.Models.Enums;

namespace LogisticaApp.Models;

public class Package
{
    public Guid PackageId { get; set; } = Guid.NewGuid();

    public string TrackingNumber { get; set; }

    public string ProductName { get; set; }
    public string Description { get; set; }
    public decimal Weight { get; set; }

    public int? OrderId { get; set; }
    public Order? Order { get; set; }

    public PackageStatus Status { get; set; } = PackageStatus.Created;

    // Origen
    public double OriginLatitude { get; set; }
    public double OriginLongitude { get; set; }
    public string OriginName { get; set; }

    // Destino
    public double DestinationLatitude { get; set; }
    public double DestinationLongitude { get; set; }
    public string DestinationName { get; set; }

    // DRIVER DIRECTO (nuevo)
    public int? DriverId { get; set; }
    public User? Driver { get; set; }

    // TRACKING EN TIEMPO REAL (nuevo)
    public double? CurrentLatitude { get; set; }
    public double? CurrentLongitude { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeliveredAt { get; set; }
}