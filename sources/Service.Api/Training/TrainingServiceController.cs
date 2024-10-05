using BusinessLogic.Shared.Interfaces;
using Data.Models.Export.Training;
using Microsoft.AspNetCore.Mvc;

namespace Service.Api.Training
{
    public class TrainingServiceController: ApiControllerBase
    {
        private readonly ITrainingService _service;

        public TrainingServiceController(ITrainingService service)
        {
            _service = service;
        }

        [HttpGet(Name = "GetAllAvailableTrainingsByCategory")]
        public async Task<List<TrainingCategoryExportModel>> GetAllAvailableTrainingsByCategory()
        {
            return await _service.GetAllAvailableTrainingsByCategory();
        }
    }
}
