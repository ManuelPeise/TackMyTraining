using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Enums;
using Data.Models.Export;
using Newtonsoft.Json;
using System;

namespace BusinessLogic.Dashboard
{
    public class DashboardService : BusinessLogicBase, IDashboardService
    {
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly IHealthModule _healthModule;

        public DashboardService(IApplicationUnitOfWork applicationUnitOfWork, IHealthModule healthModule) : base(applicationUnitOfWork)
        {
            _applicationUnitOfWork = applicationUnitOfWork;
            _healthModule = healthModule;

        }

        public async Task<DashboardConfiguration> LoadDashboardSettings()
        {
            var availableTiles = GetAvailableTiles();

            var exportModelCollection = new List<DashboardTileData>();

            try
            {
                var settings = await LoadUserSettings(CurrentUser.Id, SettingsTypeEnum.DashboardConfiguration);

                if (settings == null)
                {
                    return new DashboardConfiguration
                    {
                        AvailableTiles = availableTiles,
                        DashboardTileData = exportModelCollection
                    };
                }

                var configurations = JsonConvert.DeserializeObject<List<DashboardTileConfiguration>>(settings.SettingsJson);

                if (configurations == null)
                {
                    return new DashboardConfiguration
                    {
                        AvailableTiles = availableTiles,
                        DashboardTileData = exportModelCollection
                    };
                }

                foreach (var configuration in configurations)
                {
                    var tileData = await GetDashboardTileData(configuration.Key);

                    var exportModel = new DashboardTileData
                    {
                        DashboardTileConfiguration = configuration,
                        Data = tileData
                    };

                    exportModelCollection.Add(exportModel);
                }

                return new DashboardConfiguration
                {
                    AvailableTiles = availableTiles,
                    DashboardTileData = exportModelCollection
                };
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

                return new DashboardConfiguration
                {
                    AvailableTiles = availableTiles,
                    DashboardTileData = new List<DashboardTileData>()
                };
            }
        }

        public async Task UpdateDashboardConfiguration(List<DashboardTileConfiguration> dashboardConfigurations)
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
                        SettingsJson = JsonConvert.SerializeObject(dashboardConfigurations)
                    };

                    await UnitOfWork.UserSettingsRepository.AddAsync(settings);

                    await UnitOfWork.SaveChanges();

                    return;
                }

                var configurations = JsonConvert.DeserializeObject<List<DashboardTileConfiguration>>(settings.SettingsJson);

                var updatedConfigurations = new List<DashboardTileConfiguration>();

                foreach (var configuration in dashboardConfigurations)
                {
                    var config = dashboardConfigurations.FirstOrDefault(x => x.Key == configuration.Key);

                    if (config != null)
                    {
                        config.IsActive = configuration.IsActive;
                        config.Position = configuration.Position;

                        updatedConfigurations.Add(config);

                        continue;
                    }

                    updatedConfigurations.Add(configuration);
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

        private async Task<object?> GetDashboardTileData(DashboardTileEnum key)
        {
            switch (key)
            {
                case DashboardTileEnum.Health:
                    return await GetLastHealthDataSet();
                default: return null;
            }
        }

        private async Task<object?> GetLastHealthDataSet()
        {
            return await _healthModule.GetLastHealthDataSet();
        }

        private List<DashboardTile> GetAvailableTiles()
        {
            return new List<DashboardTile>
            {
                new DashboardTile
                {
                    Key = DashboardTileEnum.Health,
                    LabelKey = "labelDashboardTileHealth",
                    Configuration = new DashboardTileConfiguration
                    {

                         Key = DashboardTileEnum.Health,
                         Position = 0,
                         LabelKey = "labelDashboardTileHealth",
                         IsActive = false,
                    }
                }
            };
        }
        #endregion
    }
}
