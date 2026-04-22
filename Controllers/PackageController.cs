using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LogisticaApp.Models;
using LogisticaApp.Models.Enums;
using LogisticaApp.Services;

namespace LogisticaApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PackagesController : ControllerBase
{
    private readonly PackageService _service;

    public PackagesController(PackageService service)
    {
        _service = service;
    }

    // POST: api/packages - Crear nuevo paquete (Admin)
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreatePackage([FromBody] CreatePackageDto dto)
    {
        var package = new Package
        {
            ProductName = dto.ProductName,
            Description = dto.Description,
            Weight = dto.Weight,
            OriginLatitude = dto.OriginLatitude,
            OriginLongitude = dto.OriginLongitude,
            OriginName = dto.OriginName,
            DestinationLatitude = dto.DestinationLatitude,
            DestinationLongitude = dto.DestinationLongitude,
            DestinationName = dto.DestinationName
        };

        var created = await _service.CreatePackageAsync(package);

        return CreatedAtAction(nameof(GetPackage), new { id = created.PackageId }, new
        {
            mensaje = "✨ ¡Paquete registrado!",
            trackingNumber = created.TrackingNumber,
            status = created.Status.ToString()
        });
    }

    // GET: api/packages/{id} - Obtener paquete por ID
    [Authorize(Roles = "Admin")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPackage(Guid id)
    {
        var package = await _service.GetPackageByIdAsync(id);
        if (package == null)
            return NotFound("❌ Paquete no encontrado");

        return Ok(package);
    }

    // GET: api/packages - Listar todos los paquetes (Admin)
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAllPackages()
    {
        var packages = await _service.GetAllPackagesAsync();
        return Ok(packages);
    }

    [Authorize(Roles = "Driver")]
    [HttpGet("my-packages")]
    public async Task<IActionResult> GetMyPackages()
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        if (!int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        var packages = await _service.GetPackagesByDriverAsync(userId);

        return Ok(packages);
    }

    // Asignar driver a paquete
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/assign-driver/{driverId}")]
    public async Task<IActionResult> AssignDriver(Guid id, int driverId)
    {
        var result = await _service.AssignDriverAsync(id, driverId);

        if (!result.Success)
            return BadRequest(result.Message);

        return Ok(result);
    }

    // PUT: api/packages/{id}/status - Cambiar estado
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateStatusDto dto)
    {
        var (success, message, package) = await _service.UpdateStatusAsync(id, dto.Status);

        if (!success)
            return BadRequest(new { error = message });

        return Ok(new
        {
            mensaje = message,
            nuevoEstado = package.Status.ToString(),
            producto = package.ProductName
        });
    }
}

// DTOs
public class CreatePackageDto
{
    public string ProductName { get; set; }
    public string Description { get; set; }
    public decimal Weight { get; set; }
    public double OriginLatitude { get; set; }
    public double OriginLongitude { get; set; }
    public string OriginName { get; set; }
    public double DestinationLatitude { get; set; }
    public double DestinationLongitude { get; set; }
    public string DestinationName { get; set; }
}

public class UpdateStatusDto
{
    public PackageStatus Status { get; set; }
}