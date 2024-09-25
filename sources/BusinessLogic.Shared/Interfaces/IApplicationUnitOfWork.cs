using BusinessLogic.Shared.Repositories;
using Data.Models.Entities;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IApplicationUnitOfWork: IDisposable
    {
        public RepositoryBase<AppUser> UserRepository { get; }
        public RepositoryBase<UserCredentials> UserCredentialsRepository { get; }
        public RepositoryBase<LogMessage> LogRepository { get; }
        Task SaveChanges();
    }
}
