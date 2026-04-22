using LogisticaApp.Models.Enums;

namespace LogisticaApp.Models;

public class User
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public bool IsActive { get; set; } = true;
    public UserRole Role { get; set; } = UserRole.Customer;

    // Datos de driver (si aplica)
    public string? PhoneNumber { get; set; }
    public string? Vehicle { get; set; }
    public bool IsAvailable { get; set; } = true;
    public double? CurrentLatitude { get; set; }
    public double? CurrentLongitude { get; set; }

    public List<Order>? Orders { get; set; }
}