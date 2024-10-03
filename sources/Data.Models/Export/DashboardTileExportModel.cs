using Data.Models.Enums;

namespace Data.Models.Export
{
    public class DashboardTileData
    {
        public DashboardTileConfiguration? DashboardTileConfiguration { get; set; }
        public object? Data { get; set; }
    }

    public class DashboardTileConfiguration
    {
        public DashboardTileEnum Key { get; set; }
        public int Position { get; set; }
        public string? LabelKey { get; set; }
        public bool IsActive { get; set; }
    }

    public class DashboardTile
    {
        public DashboardTileEnum Key { get; set; }
        public string? LabelKey { get; set; }
        public DashboardTileConfiguration? Configuration { get; set; }
    }

    public class DashboardConfiguration
    {
        public List<DashboardTile>? AvailableTiles { get; set; }
        public List<DashboardTileData>? DashboardTileData { get; set; }
    }
}
