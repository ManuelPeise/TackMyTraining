namespace Data.Models.Export
{
    public class HealthDataStatistic
    {
        public DateTime Date { get; set; }
        public HealthDataExportModel? HealthData { get; set; }
    }
}
