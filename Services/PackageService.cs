using System;

public class PackageService
{
    private readonly IPackageRepository _repository;

    public PackageService(IPackageRepository repository)
    {
        _repository = repository;
    }

    public List<Package> GetAllPackages()
    {
        return _repository.GetAll();
    }

    public Package CreatePackage()
    {
        var package = new Package
        {
            Id = Guid.NewGuid(),
            TrackingNumber = Guid.NewGuid(),
            Status = PackageStatus.Created,
            CreatedAt = DateTime.UtcNow
        };

        _repository.Add(package);
        return package;
    }

    public bool UpdateStatus(Guid trackingNumber, PackageStatus newStatus)
{
    var package = _repository.GetByTrackingNumber(trackingNumber);

    if (package == null)
        return false;

    bool isValidTransition = false;

    switch (package.Status)
    {
        case PackageStatus.Created:
            if (newStatus == PackageStatus.InWarehouse)
                isValidTransition = true;
            break;

        case PackageStatus.InWarehouse:
            if (newStatus == PackageStatus.InRoute)
                isValidTransition = true;
            break;

        case PackageStatus.InRoute:
            if (newStatus == PackageStatus.Delivered)
                isValidTransition = true;
            break;
    }

    if (!isValidTransition)
       throw new Exception("Invalid status transition");
    package.Status = newStatus;
    _repository.Update(package);

    return true;
}
    }

