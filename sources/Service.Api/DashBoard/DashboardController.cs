using BusinessLogic.Shared.Interfaces;
using Data.Models.Export;
using Microsoft.AspNetCore.Mvc;

namespace Service.Api.DashBoard
{
    public class DashboardController : ApiControllerBase
    {
        private readonly IDashboardService _service;

        public DashboardController(IDashboardService service)
        {
            _service = service;
        }

        [HttpGet(Name = "LoadDashboardSettings")]
        public async Task<DashboardConfiguration> LoadDashboardSettings()
        {
            return await _service.LoadDashboardSettings();
        }

        [HttpPost(Name = "UpdateDashboardSettings")]
        public async Task UpdateDashboardSettings(List<DashboardTileConfiguration> configurations)
        {
            await _service.UpdateDashboardConfiguration(configurations);
        }
    }
}
