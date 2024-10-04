using Data.Models.Enums;

namespace Data.Models.Export
{
    public class DashboardTile
    {
        public DashboardTileEnum Key { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public string? LabelKey { get; set; }
        public bool IsActive { get; set; }
        public object? Data { get; set; }
        public List<object>? Statistics { get; set; }
    }
}
