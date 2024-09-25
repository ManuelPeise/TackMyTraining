using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Service.Api
{
    [Authorize]
    public class TestController: ApiControllerBase
    {

        [HttpGet(Name = "Tester")]
        public async Task<TestResult> Tester()
        {
            return new TestResult
            {
                Value = "Test"
            };
        }
    }

    public class TestResult
    {
        public string Value { get; set; }
    }
}
