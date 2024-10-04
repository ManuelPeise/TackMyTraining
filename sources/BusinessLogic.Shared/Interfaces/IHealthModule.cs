using Data.Models.Export;
using Data.Models.Import;
using Data.Models.RequestModels;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IHealthModule
    {
        Task<HealthDataExportModel> GetLastHealthDataSet(int offSet = 0);
        Task<List<HealthDataStatistic>> LoadStatisticData(TimeRange timeRange);
        Task<bool> ImportHealthData(HealthDataImport importModel);
    }
}
