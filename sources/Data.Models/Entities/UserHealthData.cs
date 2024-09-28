using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models.Entities
{
    public class UserHealthData: AEntityBase
    {
        public DateTime Date { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public decimal? BodyFat { get; set; }
        public decimal? MuscleMass { get; set; }
        public decimal? HeartBeat { get; set; }
        public decimal? BodyMassIndex { get; set; }
        public int UserId { get; set; }
    }
}
