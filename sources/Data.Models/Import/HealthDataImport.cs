namespace Data.Models.Import
{
    public class HealthDataImport
    {
        public string? Date { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public decimal? HeartBeat { get; set; }
        public decimal? BodyFat { get; set; }
        public decimal? MuscleMass { get; set; }
        public decimal? Bmi { get; set; }

    }
}
