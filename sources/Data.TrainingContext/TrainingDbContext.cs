using Data.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.TrainingContext
{
    public class TrainingDbContext: DbContext
    {
        public TrainingDbContext(DbContextOptions options):base(options) { }

        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<UserCredentials> AppUserCredentials { get; set; }
        public DbSet<LogMessage> MessageLog { get; set; }
    }
}
