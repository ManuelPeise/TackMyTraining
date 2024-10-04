using BusinessLogic.Shared.Interfaces;
using BusinessLogic.Shared.Repositories;
using Data.Models.Entities;
using Data.TrainingContext;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BusinessLogic.Shared
{
    public class ApplicationUnitOfWork: IApplicationUnitOfWork
    {
        private readonly TrainingDbContext _context;
        private RepositoryBase<AppUser> _userRepository;
        private RepositoryBase<UserCredentials> _UserCredentialsRepository;
        private RepositoryBase<UserHealthData> _healthDataRepository;
        private RepositoryBase<UserSettings> _userSettingsRepository;
        private RepositoryBase<LogMessage> _logRepository;
        private bool disposedValue;

        public ApplicationUnitOfWork(TrainingDbContext context)
        {
            _context = context;
            _userRepository = new RepositoryBase<AppUser>(context);
            _UserCredentialsRepository = new RepositoryBase<UserCredentials>(context);
            _healthDataRepository = new RepositoryBase<UserHealthData>(context);
            _userSettingsRepository = new RepositoryBase<UserSettings>(context);
            _logRepository = new RepositoryBase<LogMessage>(context);
        }

        public RepositoryBase<AppUser> UserRepository { get => _userRepository ?? new RepositoryBase<AppUser>(_context); }
        public RepositoryBase<UserCredentials> UserCredentialsRepository { get => _UserCredentialsRepository?? new RepositoryBase<UserCredentials>(_context); }
        public RepositoryBase<LogMessage> LogRepository { get => _logRepository ?? new RepositoryBase<LogMessage>(_context); }
        public RepositoryBase<UserHealthData> HealthDataRepository { get => _healthDataRepository ?? new RepositoryBase<UserHealthData>(_context); }
        public RepositoryBase<UserSettings> UserSettingsRepository { get => _userSettingsRepository ?? new RepositoryBase<UserSettings>(_context); }

        public async Task SaveChanges()
        {
            var claimsAccessor = new ClaimsAccessor();

            var modifiedEntries = _context.ChangeTracker.Entries()
               .Where(x => x.State == EntityState.Modified ||
               x.State == EntityState.Added);

            foreach (var entry in modifiedEntries)
            {
                if (entry != null)
                {
                    if (entry.State == EntityState.Added)
                    {
                        ((AEntityBase)entry.Entity).CreatedBy = claimsAccessor.GetClaimsValue<string>("UserName") ?? "System";
                        ((AEntityBase)entry.Entity).CreatedAt = DateTime.Now.ToString("yyyy-MM-dd");
                        ((AEntityBase)entry.Entity).UpdatedBy = claimsAccessor.GetClaimsValue<string>("UserName") ?? "System";
                        ((AEntityBase)entry.Entity).UpdatedAt = DateTime.Now.ToString("yyyy-MM-dd");

                    }
                    else if (entry.State == EntityState.Modified)
                    {
                        ((AEntityBase)entry.Entity).UpdatedBy = claimsAccessor.GetClaimsValue<string>("UserName") ?? "System";
                        ((AEntityBase)entry.Entity).UpdatedAt = DateTime.Now.ToString("yyyy-MM-dd");
                    }
                }
            }

            await _context.SaveChangesAsync();
        }

        #region dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
