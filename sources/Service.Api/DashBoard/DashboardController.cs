using BusinessLogic.Shared.Interfaces;
using Data.Models.Enums;
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

        [HttpGet(Name = "LoadDashboardTiles")]
        public async Task<List<DashboardTile>> LoadDashboardTiles()
        {
            return await _service.LoadDashboardTiles();
        }

        [HttpPost(Name = "UpdateDashboardSettings")]
        public async Task UpdateDashboardSettings(List<DashboardTile> tiles)
        {
            await _service.UpdateDashboardConfiguration(tiles);
        }
    }
}
