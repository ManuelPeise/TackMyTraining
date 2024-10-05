using Data.Models.Enums.Training;

namespace Data.Models.Export.Training
{
    public class TrainingExportModel
    {
        public TrainingTypeEnum Type { get; set; }
        public string? ResourceKey { get; set; }

    }
}
