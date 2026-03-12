using Microsoft.AspNetCore.Mvc;
using System;

[ApiController]
[Route("api/[controller]")]
public class PackagesController : ControllerBase
{
    private readonly PackageService _service;

    public PackagesController(PackageService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var packages = _service.GetAllPackages();
        return Ok(packages);
    }

    [HttpPost]
    public IActionResult Create()
    {
        var package = _service.CreatePackage();
        return Ok(package);
    }

    [HttpPut("{trackingNumber}/status")]
    public IActionResult UpdateStatus(Guid trackingNumber, [FromBody] PackageStatus status)
    {
        var updated = _service.UpdateStatus(trackingNumber, status);

        if (!updated)
            return NotFound("Package not found");

        return Ok(new { message = "Status updated" }); 
    }
}
