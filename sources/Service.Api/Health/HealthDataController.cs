using BusinessLogic.Shared.Interfaces;
using Data.Models.Export;
using Data.Models.RequestModels;
using Microsoft.AspNetCore.Mvc;

namespace Service.Api.Health
{
    public class HealthDataController : ApiControllerBase
    {
        private IHealthModule _healthModule;

        public HealthDataController(IHealthModule healthModule)
        {
            _healthModule = healthModule;
        }

        [HttpGet(Name ="GetLastHealthDataSet")]
        public async Task<HealthDataExportModel> GetLastHealthDataSet()
        {
            return await _healthModule.GetLastHealthDataSet();
        }

        [HttpGet(Name = "GetStatisticData")]
        public async Task<List<HealthDataStatistic>> GetStatisticData([FromQuery]TimeRange timeRange)
        {
            return await _healthModule.LoadStatisticData(timeRange);
        }
    }
}
