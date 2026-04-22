using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using LogisticaApp.DTOs;
using LogisticaApp.Services;

namespace LogisticaApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    // POST: api/auth/register - Registro público
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
    {
        var response = await _authService.RegisterAsync(dto);

        if (!response.Success)
            return BadRequest(response);

        return Ok(response);
    }

    // POST: api/auth/login - Login general
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        var response = await _authService.LoginAsync(dto);

        if (!response.Success)
            return Unauthorized(response);

        return Ok(response);
    }

    // PUT: api/auth/change-password - Cambiar contraseña (requiere autenticación)
    [Authorize]
    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO dto)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out int userId))
            return Unauthorized();

        var response = await _authService.ChangePasswordAsync(userId, dto);

        if (!response.Success)
            return BadRequest(response);

        return Ok(response);
    }

    // POST: api/auth/create-driver - Crear driver (solo admin)
    [Authorize(Roles = "Admin")]
    [HttpPost("create-driver")]
    public async Task<IActionResult> CreateDriver([FromBody] CreateDriverDTO dto)
    {
        var response = await _authService.CreateDriverAsync(dto);

        if (!response.Success)
            return BadRequest(response);

        return Ok(response);
    }
}