using Data.Models.Export;
using Data.Models.Import;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IUserLoginService
    {
        Task<UserExportModel?> Login(UserLogin userLogin);
    }
}
