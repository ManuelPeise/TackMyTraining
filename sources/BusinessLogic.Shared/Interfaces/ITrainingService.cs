using Data.Models.Export.Training;

namespace BusinessLogic.Shared.Interfaces
{
    public interface ITrainingService
    {
        Task<List<TrainingCategoryExportModel>> GetAllAvailableTrainingsByCategory();
    }
}
