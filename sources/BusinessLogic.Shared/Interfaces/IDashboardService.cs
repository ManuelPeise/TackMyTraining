using Data.Models.Export;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardConfiguration> LoadDashboardSettings();
        Task UpdateDashboardConfiguration(List<DashboardTileConfiguration> dashboardConfigurations);
    }
}
