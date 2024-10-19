using BusinessLogic.Shared.Repositories;
using Data.Models.Entities;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IApplicationUnitOfWork : IDisposable
    {
        RepositoryBase<AppUser> UserRepository { get; }
        RepositoryBase<UserCredentials> UserCredentialsRepository { get; }
        RepositoryBase<UserHealthData> HealthDataRepository { get; }
        RepositoryBase<UserSettings> UserSettingsRepository { get; }
        RepositoryBase<LogMessage> LogRepository { get; }
        RepositoryBase<Contact> ContactRepository { get; }

        Task SaveChanges();
    }
}
