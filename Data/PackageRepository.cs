using System;
using System.Collections.Generic;
using System.Linq;

public class InMemoryPackageRepository : IPackageRepository
{
    private static List<Package> _packages = new List<Package>();

    public List<Package> GetAll()
    {
        return _packages;
    }

    public void Add(Package package)
    {
        _packages.Add(package);
    }

    public Package GetByTrackingNumber(Guid trackingNumber)
    {
        return _packages.FirstOrDefault(p => p.TrackingNumber == trackingNumber);
    }

    public void Update(Package package)
    {
        var existingPackage = GetByTrackingNumber(package.TrackingNumber);

        if (existingPackage != null)
        {
            existingPackage.Status = package.Status;
        }
    }
}



