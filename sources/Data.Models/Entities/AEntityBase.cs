using System.ComponentModel.DataAnnotations;

namespace Data.Models.Entities
{
    public abstract class AEntityBase
    {
        [Key]
        public int Id { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public string CreatedAt { get; set; } = string.Empty;
        public string UpdatedBy { get; set; } = string.Empty;
        public string UpdatedAt { get; set; } = string.Empty;
    }
}
