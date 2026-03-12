using System;
using System.Collections.Generic;

public interface IPackageRepository
{
    List<Package> GetAll();
    void Add(Package package);
    Package GetByTrackingNumber(Guid trackingNumber);
    void Update(Package package);
}

