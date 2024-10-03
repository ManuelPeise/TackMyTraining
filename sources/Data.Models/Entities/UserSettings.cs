using Data.Models.Enums;

namespace Data.Models.Entities
{
    public class UserSettings : AEntityBase
    {
        public int UserId { get; set; }
        public string SettingsName { get; set; } = string.Empty;
        public SettingsTypeEnum SettingsType { get; set; }
        public string SettingsJson { get; set; } = string.Empty;
    }
}
