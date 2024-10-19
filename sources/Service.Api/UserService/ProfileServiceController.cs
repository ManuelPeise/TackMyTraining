using BusinessLogic.Shared.Interfaces;
using Data.Models.Export;
using Data.Models.Import;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Service.Api.UserService
{
    [Authorize]
    public class ProfileServiceController : ApiControllerBase
    {
        private readonly IUserService _userService;

        public ProfileServiceController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<UserProfileExportModel?> GetProfile()
        {
            return await _userService.GetProfileData();
        }

        [HttpPost]
        public async Task<bool> UpdateProfile(UserProfile profile)
        {
            return await _userService.UpdateProfile(profile);
        }
    }
}
