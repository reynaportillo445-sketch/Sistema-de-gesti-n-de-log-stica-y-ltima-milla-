using LogisticaApp.Data;
using LogisticaApp.DTOs;
using LogisticaApp.Models;
using LogisticaApp.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace LogisticaApp.Services;

public class AuthService
{
    private readonly AppDbContext _context;
    private readonly PasswordService _passwordService;
    private readonly IConfiguration _configuration;

    public AuthService(AppDbContext context, PasswordService passwordService, IConfiguration configuration)
    {
        _context = context;
        _passwordService = passwordService;
        _configuration = configuration;
    }

    /// <summary>
    /// Crea el admin maestro si no existe
    /// </summary>
    public async Task InitializeAdminAsync()
    {
        var adminExists = await _context.Users.AnyAsync(u => u.Role == UserRole.Admin);

        if (!adminExists)
        {
            var adminUser = new User
            {
                FirstName = "Admin",
                LastName = "Principal",
                Username = "admin",
                Email = "admin@logistica.local",
                Address = "Sistema",
                PhoneNumber = "00000000",
                PasswordHash = _passwordService.HashPassword("Admin123!"),
                Role = UserRole.Admin,
                IsActive = true
            };

            _context.Users.Add(adminUser);
            await _context.SaveChangesAsync();

            Console.WriteLine("ADMIN CREADO: admin@logistica.local / Admin123!");
        }
    }

    /// <summary>
    /// Registro público para clientes
    /// </summary>
    public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO dto)
    {
        // Validar contraseñas
        if (dto.Password != dto.ConfirmPassword)
            return new AuthResponseDTO { Success = false, Message = "Las contraseñas no coinciden" };

        // Validar contraseña
        var (isValid, message) = _passwordService.ValidatePassword(dto.Password);
        if (!isValid)
            return new AuthResponseDTO { Success = false, Message = message };

        // Email único
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return new AuthResponseDTO { Success = false, Message = "El email ya está registrado" };

        var user = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Address = dto.Address,
            PhoneNumber = dto.PhoneNumber,

            Username = dto.Email,
            Email = dto.Email,
            PasswordHash = _passwordService.HashPassword(dto.Password),
            Role = UserRole.Customer,
            IsActive = true
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new AuthResponseDTO
        {
            Success = true,
            Message = "Registro exitoso. Ya puedes iniciar sesión"
        };
    }

    /// <summary>
    /// Login general
    /// </summary>
    public async Task<AuthResponseDTO> LoginAsync(LoginDTO dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null || !_passwordService.VerifyPassword(dto.Password, user.PasswordHash))
            return new AuthResponseDTO { Success = false, Message = "❌ Email o contraseña incorrectos" };

        if (!user.IsActive)
            return new AuthResponseDTO { Success = false, Message = "❌ Usuario inactivo" };

        var token = GenerateJwtToken(user);

        return new AuthResponseDTO
        {
            Success = true,
            Message = "✅ Login exitoso",
            Token = token,
            User = new UserDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role.ToString()
            }
        };
    }

    /// <summary>
    /// Cambiar contraseña
    /// </summary>
    public async Task<AuthResponseDTO> ChangePasswordAsync(int userId, ChangePasswordDTO dto)
    {
        var user = await _context.Users.FindAsync(userId);

        if (user == null)
            return new AuthResponseDTO { Success = false, Message = "Usuario no encontrado" };

        if (!_passwordService.VerifyPassword(dto.CurrentPassword, user.PasswordHash))
            return new AuthResponseDTO { Success = false, Message = "Contraseña actual incorrecta" };

        var (isValid, message) = _passwordService.ValidatePassword(dto.NewPassword);
        if (!isValid)
            return new AuthResponseDTO { Success = false, Message = message };

        if (dto.NewPassword != dto.ConfirmNewPassword)
            return new AuthResponseDTO { Success = false, Message = "Las nuevas contraseñas no coinciden" };

        user.PasswordHash = _passwordService.HashPassword(dto.NewPassword);
        await _context.SaveChangesAsync();

        return new AuthResponseDTO
        {
            Success = true,
            Message = "Contraseña cambiada exitosamente"
        };
    }

    /// <summary>
    /// Crear driver (solo admin)
    /// </summary>
    public async Task<AuthResponseDTO> CreateDriverAsync(CreateDriverDTO dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return new AuthResponseDTO { Success = false, Message = "El email ya está registrado" };

        var tempPassword = GenerateTempPassword();

        var user = new User
        {
            FirstName = dto.Username, // puedes ajustar si separas nombre real
            LastName = "Driver",
            Username = dto.Email,
            Email = dto.Email,
            Address = "Pendiente",
            PhoneNumber = dto.PhoneNumber,

            Vehicle = dto.Vehicle,
            IsAvailable = true,

            PasswordHash = _passwordService.HashPassword(tempPassword),
            Role = UserRole.Driver,
            IsActive = true
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new AuthResponseDTO
        {
            Success = true,
            Message = $"Conductor creado. Contraseña temporal: {tempPassword}",
            User = new UserDTO
            {
                UserId = user.UserId,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role.ToString()
            }
        };
    }

    /// <summary>
    /// Genera JWT
    /// </summary>
    private string GenerateJwtToken(User user)
    {
        var jwtKey = _configuration["Jwt:Key"];
        var jwtIssuer = _configuration["Jwt:Issuer"];
        var jwtAudience = _configuration["Jwt:Audience"];

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    /// <summary>
    /// Genera contraseña temporal
    /// </summary>
    private string GenerateTempPassword()
    {
        var random = new Random();
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
        return new string(Enumerable.Range(0, 12).Select(_ => chars[random.Next(chars.Length)]).ToArray());
    }
}