using Data.Models.Entities;
using Data.TrainingContext.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Data.TrainingContext
{
    public class TrainingDbContext: DbContext
    {
        private readonly IConfiguration _configuration;
        public TrainingDbContext(DbContextOptions options, IConfiguration config):base(options) 
        { 
            _configuration = config; 
        }

        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<UserCredentials> AppUserCredentials { get; set; }
        public DbSet<LogMessage> MessageLog { get; set; }
        public DbSet<UserHealthData> HealthDatas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new UserCredentialsConfiguration(_configuration));
            builder.ApplyConfiguration(new AppUserConfiguration(_configuration));
        }
    }
}
