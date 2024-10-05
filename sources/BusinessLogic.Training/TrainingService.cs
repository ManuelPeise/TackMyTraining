using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Enums.Training;
using Data.Models.Export.Training;
using Newtonsoft.Json;

namespace BusinessLogic.Training
{
    public class TrainingService : BusinessLogicBase, ITrainingService
    {
        private readonly Dictionary<TrainingCategoryTypeEnum, KeyValuePair<string, Dictionary<TrainingTypeEnum, string>>> _trainingConfigurations;

        public TrainingService(IApplicationUnitOfWork unitOfWork) : base(unitOfWork)
        {
            _trainingConfigurations = TrainingConfigurations.Configurations;
        }

        public async Task<List<TrainingCategoryExportModel>> GetAllAvailableTrainingsByCategory()
        {
            try
            {
                var availableTrainings = (from key in _trainingConfigurations.Keys
                                         select new TrainingCategoryExportModel
                                         {
                                             Category = key,
                                             ResourceKey = _trainingConfigurations[key].Key,
                                             Trainings = (from training in _trainingConfigurations[key].Value
                                                          select new TrainingExportModel
                                                          {
                                                              Type = training.Key,
                                                              ResourceKey = training.Value
                                                          }).ToList()
                                         }).ToList();

                return await Task.FromResult(availableTrainings);
            }
            catch (Exception exception)
            {
                await LogMessage(new LogMessage
                {
                    TimeStamp = DateTime.UtcNow,
                    Trigger = nameof(TrainingService),
                    Message = "Could not load available trainings.",
                    ExceptionJson = JsonConvert.SerializeObject(exception)
                });
            }

            return await Task.FromResult(new List<TrainingCategoryExportModel>());
        }
    }
}
