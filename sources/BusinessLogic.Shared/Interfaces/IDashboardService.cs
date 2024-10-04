using Data.Models.Enums;
using Data.Models.Export;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IDashboardService
    {
        Task<List<DashboardTile>> LoadDashboardTiles();
        Task UpdateDashboardConfiguration(List<DashboardTile> tiles);
    }
}
