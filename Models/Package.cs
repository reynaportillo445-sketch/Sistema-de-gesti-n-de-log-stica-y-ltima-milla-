using System;

public class Package
{
    public Guid Id { get; set; }
    public Guid TrackingNumber { get; set; }
    public PackageStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}
