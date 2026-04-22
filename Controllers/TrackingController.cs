using Microsoft.AspNetCore.Mvc;
using LogisticaApp.Services;

namespace LogisticaApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TrackingController : ControllerBase
{
    private readonly TrackingService _service;

    public TrackingController(TrackingService service)
    {
        _service = service;
    }

    // GET: api/tracking/{trackingNumber} - PÚBLICO, SIN AUTENTICACIÓN
    [HttpGet("{trackingNumber}")]
    public async Task<IActionResult> GetTracking(string trackingNumber)
    {
        var tracking = await _service.GetTrackingAsync(trackingNumber);

        if (tracking == null)
            return NotFound(new { error = "📭 Paquete no encontrado" });

        return Ok(new
        {
            mensaje = "🔎 Seguimiento del paquete",
            seguimiento = tracking
        });
    }
}