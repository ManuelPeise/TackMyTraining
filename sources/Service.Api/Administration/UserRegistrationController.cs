using BusinessLogic.Shared.Interfaces;
using Data.Models.Export;
using Data.Models.Import;
using Microsoft.AspNetCore.Mvc;

namespace Service.Api.Administration
{
    public class UserRegistrationController : ApiControllerBase
    {
        private readonly IUserRegistrationService _registrationService;
        public UserRegistrationController(IUserRegistrationService registrationService)
        {
            _registrationService = registrationService;
        }

        [HttpPost(Name = "RegisterUser")]
        public async Task<RegistrationResult> RegisterUser(UserRegistration userRegistration)
        {
            return new RegistrationResult { Success = await _registrationService.RegisterUser(userRegistration) };
        }
    }
}
