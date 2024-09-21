using Microsoft.EntityFrameworkCore;

namespace Data.TrainingContext
{
    public class TrainingDbContext: DbContext
    {
        public TrainingDbContext(DbContextOptions options):base(options) { }
     
    }
}
