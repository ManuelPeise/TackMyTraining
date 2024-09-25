using Data.Models.Export;
using Data.Models.Import;
using Microsoft.Extensions.Configuration;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IUserLoginService
    {
        Task<UserExportModel?> Login(UserLogin userLogin, IConfiguration config);
    }
}
