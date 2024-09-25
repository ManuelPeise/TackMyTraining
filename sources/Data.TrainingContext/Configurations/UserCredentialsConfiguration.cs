using Data.Models.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace Data.TrainingContext.Configurations
{
    public class UserCredentialsConfiguration : IEntityTypeConfiguration<UserCredentials>
    {
        private readonly IConfiguration _configuration;
        public UserCredentialsConfiguration(IConfiguration config)
        {
            _configuration = config;
        }

        public void Configure(EntityTypeBuilder<UserCredentials> builder)
        {
            var createdAt = DateTime.Now.ToString("yyyy-MM-dd");
            var salt = Guid.NewGuid().ToString();

            builder.HasData(new UserCredentials
            {
                Id = 1,
                JwT = "",
                RefreshToken = "",
                FailedLoginAttemts = 0,
                Password = GetEncodedSecret(_configuration["DefaultUser:Password"], salt),
                Salt = salt,
                CreatedAt = createdAt,
                CreatedBy = "System",
                UpdatedAt = createdAt,
                UpdatedBy = "System",
            });
        }

        private string GetEncodedSecret(string secret, string salt)
        {
            var bytes = Encoding.UTF8.GetBytes(secret).ToList();
            bytes.AddRange(Encoding.UTF8.GetBytes(salt));

            return Convert.ToBase64String(bytes.ToArray());
        }
    }
}
