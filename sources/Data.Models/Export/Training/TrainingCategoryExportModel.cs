using Data.Models.Enums.Training;

namespace Data.Models.Export.Training
{
    public class TrainingCategoryExportModel
    {
        public TrainingCategoryTypeEnum Category { get; set; }
        public string? ResourceKey { get; set; }
        public List<TrainingExportModel> Trainings { get; set; } = new List<TrainingExportModel>();
    }
}
