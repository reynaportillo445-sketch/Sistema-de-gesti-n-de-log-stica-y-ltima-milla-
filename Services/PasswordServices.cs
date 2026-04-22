using System.Text.RegularExpressions;

namespace LogisticaApp.Services;

public class PasswordService
{
    /// <summary>
    /// Valida que la contraseña cumpla con requisitos:
    /// - Mínimo 8 caracteres
    /// - Al menos un número
    /// - Al menos un símbolo (!@#$%^&*)
    /// - Al menos una mayúscula
    /// </summary>
    public (bool IsValid, string Message) ValidatePassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
            return (false, "La contraseña no puede estar vacía");

        if (password.Length < 8)
            return (false, "La contraseña debe tener mínimo 8 caracteres");

        if (!Regex.IsMatch(password, @"[A-Z]"))
            return (false, "Debe contener al menos una MAYÚSCULA");

        if (!Regex.IsMatch(password, @"[0-9]"))
            return (false, "Debe contener al menos un NÚMERO");

        if (!Regex.IsMatch(password, @"[!@#$%^&*()_+=\[\]{};:'""\\|,.<>?/]"))
            return (false, "Debe contener al menos un SÍMBOLO (!@#$%^&*)");

        return (true, "Contraseña válida");
    }

    /// <summary>
    /// Hashea una contraseña con BCrypt
    /// </summary>
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    /// <summary>
    /// Verifica que la contraseña coincida con el hash
    /// </summary>
    public bool VerifyPassword(string password, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }
}