namespace LogisticaApp.DTOs;

// Registro público (clientes)
public class RegisterDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string PhoneNumber { get; set; }

    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}

// Login general
public class LoginDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
}

// Response después de login (con token)
public class AuthResponseDTO
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public string? Token { get; set; }
    public UserDTO? User { get; set; }
}

// Info del usuario en el token
public class UserDTO
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
}

// Cambio de contraseña obligatorio (admin maestro)
public class ChangePasswordDTO
{
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
    public string ConfirmNewPassword { get; set; }
}

// Crear driver (solo admin)
public class CreateDriverDTO
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Vehicle { get; set; } // "Moto", "Carro", etc.
}