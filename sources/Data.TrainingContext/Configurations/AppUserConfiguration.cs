using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Data.Models.Entities;
using System.Text;

namespace Data.TrainingContext.Configurations
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        private readonly IConfiguration _configuration;
        public AppUserConfiguration(IConfiguration config)
        {
            _configuration = config;
        }

        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            var createdAt = DateTime.Now.ToString("yyyy-MM-dd");
            var salt = Guid.NewGuid().ToString();
            var dateOfBirth = _configuration["DefaultUser:DateOfBirth"] == null
                ? DateTime.Now
                : DateTime.Parse((string)_configuration["DefaultUser:DateOfBirth"]);

            builder.HasData(new AppUser
            {
                Id = 1,
                FirstName = _configuration["DefaultUser:FirstName"],
                LastName = _configuration["DefaultUser:LastName"],
                DateOfBirth = dateOfBirth,
                Email = _configuration["DefaultUser:Email"],
                IsActive = true,
                CrendentialsId = 1,
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
