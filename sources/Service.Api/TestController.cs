using Data.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Service.Api
{
    [Authorize]
    public class TestController: ApiControllerBase
    {

        //[HttpGet(Name = "Tester")]
        //public async Task<AppUser> Tester()
        //{
        //    var healthModule = new HealthModule();

        //    return healthModule.LoadAppUser();
        //}
    }

    public class TestResult
    {
        public string Value { get; set; }
    }
}
