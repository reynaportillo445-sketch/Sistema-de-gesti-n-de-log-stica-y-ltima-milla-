using System;
using System.Collections.Generic;
using System.Linq;

public class EfPackageRepository : IPackageRepository
{
    private readonly AppDbContext _context;

    public EfPackageRepository(AppDbContext context)
    {
        _context = context;
    }

    public List<Package> GetAll()
    {
        return _context.Packages.ToList();
    }

    public void Add(Package package)
    {
        _context.Packages.Add(package);
        _context.SaveChanges();
    }

    public Package GetByTrackingNumber(Guid trackingNumber)
    {
        return _context.Packages
            .FirstOrDefault(p => p.TrackingNumber == trackingNumber);
    }

    public void Update(Package package)
    {
        _context.Packages.Update(package);
        _context.SaveChanges();
    }
}