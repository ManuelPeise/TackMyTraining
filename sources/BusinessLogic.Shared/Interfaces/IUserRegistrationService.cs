using Data.Models.Import;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IUserRegistrationService
    {
        Task<bool> RegisterUser(UserRegistration userRegistration);
        Task<bool> UnRegisterUser(int userId);
    }
}
