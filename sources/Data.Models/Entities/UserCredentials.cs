namespace Data.Models.Entities
{
    public class UserCredentials: AEntityBase
    {
        public string Password { get; set; } = string.Empty;
        public string Salt { get; set; } = string.Empty;
        public string JwT { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public int FailedLoginAttemts { get; set; }
    }
}
