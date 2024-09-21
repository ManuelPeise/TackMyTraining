using BusinessLogic.Shared.Interfaces;
using Data.Models.Export;
using Data.Models.Import;
using Microsoft.AspNetCore.Mvc;

namespace Service.Api.UserService
{
    public class LoginServiceController: ApiControllerBase
    {
        private readonly IUserLoginService _loginService;
        public LoginServiceController(IUserLoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost(Name = "Login")]
        public async Task<UserExportModel?> Login(UserLogin userLogin)
        {
            return await _loginService.Login(userLogin);
        }
    }
}
