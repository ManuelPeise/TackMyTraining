using BusinessLogic.Shared.Interfaces;
using Data.Models.Export;
using Data.Models.Import;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Service.Api.UserService
{
    public class LoginServiceController: ApiControllerBase
    {
        private readonly IUserLoginService _loginService;
        private readonly IConfiguration _configuration;
        public LoginServiceController(IUserLoginService loginService, IConfiguration configuration)
        {
            _loginService = loginService;
            _configuration = configuration;
        }

        [HttpPost(Name = "Login")]
        public async Task<UserExportModel?> Login(UserLogin userLogin)
        {
            return await _loginService.Login(userLogin, _configuration);
        }
    }
}
