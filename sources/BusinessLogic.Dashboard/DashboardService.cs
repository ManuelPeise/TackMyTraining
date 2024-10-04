using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.Export;
using Data.Models.RequestModels;
using Newtonsoft.Json;

namespace BusinessLogic.Dashboard
{
    public class DashboardService : BusinessLogicBase, IDashboardService
    {
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly IHealthModule _healthModule;

        private readonly Dictionary<DashboardTileEnum, DashboardTile> _dashBoardTileMapping = new Dictionary<DashboardTileEnum, DashboardTile>
        {
            {DashboardTileEnum.Health, new DashboardTile {
                 Key = DashboardTileEnum.Health,
                 LabelKey = "labelDashboardTileHealth",
                 Row = 1,
                 Column = 1,
                }
            },
        };

        public DashboardService(IApplicationUnitOfWork applicationUnitOfWork, IHealthModule healthModule) : base(applicationUnitOfWork)
        {
            _applicationUnitOfWork = applicationUnitOfWork;
            _healthModule = healthModule;

        }

        public async Task<List<DashboardTile>> LoadDashboardTiles()
        {
            var availableTiles = GetAvailableTiles();

            try
            {
                var settings = await LoadUserSettings(CurrentUser.Id, SettingsTypeEnum.DashboardConfiguration);

                if (settings == null)
                {
                    return new List<DashboardTile>();
                }

                var configuredTiles = JsonConvert.DeserializeObject<List<DashboardTile>>(settings.SettingsJson) ?? new List<DashboardTile>();

                var exportTiles = new List<DashboardTile>();

                foreach (var tile in availableTiles)
                {
                    var configuredTile = configuredTiles.FirstOrDefault(x => x.Key == tile.Key);

                    if (configuredTile == null)
                    {
                        exportTiles.Add(tile);

                        continue;
                    }

                    tile.IsActive = configuredTile.IsActive;

                    if (configuredTile.Row > 0)
                    {
                        tile.Row = configuredTile.Row;
                    }

                    if (configuredTile.Column > 0)
                    {
                        tile.Column = configuredTile.Column;
                    }

                    var actualData = await GetDashboardTileData(DataTypeEnum.Actual);
                    var statisticData = await GetDashboardTileData(DataTypeEnum.Statistic, -6);

                    tile.Data = actualData?.FirstOrDefault();
                    tile.Statistics = statisticData;

                    exportTiles.Add(tile);
                }

                return exportTiles;
            }
            catch (Exception exception)
            {
                await UnitOfWork.LogRepository.AddAsync(new LogMessage
                {
                    Trigger = nameof(DashboardService),
                    Message = $"Loading dashboard settings for user [{CurrentUser.Id}] failed!",
                    ExceptionJson = JsonConvert.SerializeObject(exception),
                    TimeStamp = DateTime.UtcNow
                });

                await UnitOfWork.SaveChanges();

                return new List<DashboardTile>();
            }
        }

        public async Task UpdateDashboardConfiguration(List<DashboardTile> tiles)
        {
            try
            {
                var settings = await LoadUserSettings(CurrentUser.Id, SettingsTypeEnum.DashboardConfiguration);

                if (settings == null)
                {
                    settings = new UserSettings
                    {
                        SettingsType = DashboardSettings.SettingsType,
                        SettingsName = DashboardSettings.Name,
                        UserId = CurrentUser.Id,
                        SettingsJson = JsonConvert.SerializeObject(tiles)
                    };

                    await UnitOfWork.UserSettingsRepository.AddAsync(settings);

                    await UnitOfWork.SaveChanges();

                    return;
                }

                var configurations = JsonConvert.DeserializeObject<List<DashboardTile>>(settings.SettingsJson);

                var updatedConfigurations = new List<DashboardTile>();

                foreach (var tile in tiles)
                {
                    var config = tiles.FirstOrDefault(x => x.Key == tile.Key);

                    if (config != null)
                    {
                        config.IsActive = tile.IsActive;
                        config.Row = tile.Row;
                        config.Column = tile.Column;

                        updatedConfigurations.Add(config);

                        continue;
                    }

                    updatedConfigurations.Add(tile);
                }

                settings.SettingsJson = JsonConvert.SerializeObject(updatedConfigurations);

                await UnitOfWork.UserSettingsRepository.Update(settings);

                await SaveUserSettings(settings);
            }
            catch (Exception exception)
            {
                await UnitOfWork.LogRepository.AddAsync(new LogMessage
                {
                    Trigger = nameof(DashboardService),
                    Message = $"Could not update dashboard settings for user [{CurrentUser.Id}]!",
                    ExceptionJson = JsonConvert.SerializeObject(exception),
                    TimeStamp = DateTime.UtcNow
                });

                await UnitOfWork.SaveChanges();
            }
        }


        #region private members

        private async Task<List<object>?> GetDashboardTileData(DataTypeEnum type, int offSet = 0)
        {
            var dataSets = new List<object>();

            switch (type)
            {
                case DataTypeEnum.Actual:
                    dataSets.Add(await _healthModule.GetLastHealthDataSet(offSet));
                    return dataSets;
                case DataTypeEnum.Statistic:
                    var data = await _healthModule.LoadStatisticData(new TimeRange { From = DateTime.UtcNow.AddDays(offSet).Date, To = DateTime.UtcNow.Date });
                    var healthData = data.Select(x => x.HealthData);
                    dataSets.AddRange(data.Select(x => x.HealthData));
                    return dataSets;
                default: return null;
            }
        }

        private List<DashboardTile> GetAvailableTiles()
        {
            var tiles = new List<DashboardTile>();

            foreach (var entry in _dashBoardTileMapping)
            {
                tiles.Add(new DashboardTile
                {
                    Key = entry.Key,

                    Row = entry.Value.Row,
                    Column = entry.Value.Column,
                    IsActive = entry.Value.IsActive,
                    LabelKey = entry.Value.LabelKey,
                });
            }

            return tiles;
        }
        #endregion
    }
}
