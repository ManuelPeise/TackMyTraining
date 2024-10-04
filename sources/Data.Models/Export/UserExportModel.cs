using Data.Models.Interfaces;

namespace Data.Models.Export
{
    public class UserExportModel : IUser
    {
        public string FirstName { get ; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }
        public JWTData JwtData { get; set; } = new JWTData();
    }

    public class JWTData
    {
        public string JwtToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }

    public class RegistrationResult
    {
        public bool Success { get; set; }
    }
}
