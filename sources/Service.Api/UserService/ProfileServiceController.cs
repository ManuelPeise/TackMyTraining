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

        [HttpGet(Name = "GetProfile")]
        public async Task<UserProfileExportModel?> GetProfile()
        {
            return await _userService.GetProfileData();
        }

        [HttpPost(Name = "UpdateProfile")]
        public async Task<bool> UpdateProfile(ProfileImportModel profile)
        {
            return await _userService.UpdateProfileData(profile);
        }

        [HttpPost(Name = "UpdateContact")]
        public async Task<bool> UpdateContact(ContactDataImportModel contact)
        {
            return await _userService.UpdateContactData(contact);
        }
    }
}
