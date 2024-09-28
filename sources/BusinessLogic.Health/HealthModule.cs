using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Export;
using Data.Models.Import;
using Data.Models.RequestModels;
using Newtonsoft.Json;

namespace BusinessLogic.Health
{
    public class HealthModule : BusinessLogicBase, IHealthModule
    {
        public HealthModule(IApplicationUnitOfWork unitOfWork) : base(unitOfWork) { }

        public async Task<HealthDataExportModel> GetLastHealthDataSet()
        {
            try
            {
                var dataSets = await UnitOfWork.HealthDataRepository.GetAllAsyncBy(x => x.UserId == CurrentUser.Id);

                var selectedDataSet = dataSets.FirstOrDefault(set => set.Date == dataSets.Max(s => s.Date));

                if (!dataSets.Any() || selectedDataSet == null)
                {
                    throw new Exception($"There are no datasets for [{CurrentUser.Id}] available!");
                }

                return new HealthDataExportModel
                {
                    Date = selectedDataSet.Date,
                    Height = selectedDataSet.Height,
                    Weight = selectedDataSet.Weight,
                    HeartBeat = selectedDataSet.HeartBeat,
                    MuscleMass = selectedDataSet.MuscleMass,
                    BodyFat = selectedDataSet.BodyFat,
                    Bmi = selectedDataSet.BodyMassIndex
                };

            }
            catch (Exception exception)
            {
                await LogMessage(new LogMessage
                {
                    TimeStamp = DateTime.UtcNow,
                    Trigger = nameof(HealthModule),
                    Message = "Could not load last health data set.",
                    ExceptionJson = JsonConvert.SerializeObject(exception)
                });

                return await Task.FromResult(new HealthDataExportModel
                {

                });
            }
        }

        public async Task<List<HealthDataStatistic>> LoadStatisticData(TimeRange timeRange)
        {
            try
            {
                var healthDataEntries = await UnitOfWork.HealthDataRepository.GetAllAsyncBy(x => x.Date.Date >= timeRange.From.Date && x.Date.Date <= timeRange.To.Date);

                if (!healthDataEntries.Any())
                {
                    throw new Exception($"There is no health data for [{CurrentUser.Id}]!");
                }

                var heathDataByDate = healthDataEntries.ToLookup(x => x.Date.Date);

                var affectedDates = GetAffectedDates(timeRange);

                var staticticData = GetStatisticDataCollection(affectedDates, heathDataByDate);

                return staticticData;

            }
            catch (Exception exception)
            {
                await LogMessage(new LogMessage
                {
                    TimeStamp = DateTime.UtcNow,
                    Trigger = nameof(HealthModule),
                    Message = "Could health statistic data.",
                    ExceptionJson = JsonConvert.SerializeObject(exception)
                });

                return new List<HealthDataStatistic>();
            }
        }

        public async Task<bool> ImportHealthData(HealthDataImport importModel)
        {
            try
            {
                ValidateHealthDataImportModel(importModel, out var healthData);

                await UnitOfWork.HealthDataRepository.AddAsync(healthData);

                await UnitOfWork.SaveChanges();

                return await Task.FromResult(true);
            }
            catch (Exception exception)
            {
                await LogMessage(new LogMessage
                {
                    TimeStamp = DateTime.UtcNow,
                    Trigger = nameof(HealthModule),
                    Message = "Could not save health data.",
                    ExceptionJson = JsonConvert.SerializeObject(exception)
                });

                return await Task.FromResult(false);
            }
        }

        #region private members

        private void ValidateHealthDataImportModel(HealthDataImport importModel, out UserHealthData healthData)
        {
            if (importModel.Date > DateTime.UtcNow || importModel.Height <= 0 || importModel.Weight <= 0)
            {
                throw new Exception("Found invalid import model!");
            }

            healthData = new UserHealthData
            {
                UserId = CurrentUser.Id,
                Date = importModel.Date,
                Height = importModel.Height,
                Weight = importModel.Weight,
                MuscleMass = GetValueOrNull(importModel.MuscleMass),
                BodyFat = GetValueOrNull(importModel.BodyFat),
                HeartBeat = GetValueOrNull(importModel.HeartBeat),
                BodyMassIndex = importModel.Bmi
            };
        }

        private static decimal? GetValueOrNull(decimal? value)
        {
            return value == null || value == 0 ? null : (decimal)value;
        }

        private List<DateTime> GetAffectedDates(TimeRange timeRange)
        {
            var affectedDates = new List<DateTime>();
            var currentDate = timeRange.From;

            while(currentDate <= timeRange.To)
            {
                affectedDates.Add(currentDate);
                currentDate = currentDate.AddDays(1);
            }

            return affectedDates;
        }

        private HealthDataExportModel GetStatisticData(IEnumerable<UserHealthData> dataSets, DateTime date)
        {
            var entrieCount = dataSets.Count();

            return new HealthDataExportModel
            {
                Date = date,
                Height = SaveDivide(dataSets.Sum(x => x.Height), entrieCount) ?? 0.00m,
                Weight = SaveDivide(dataSets.Sum(x => x.Weight), entrieCount) ?? 0.00m,
                BodyFat = SaveDivide(dataSets.Sum(x => x.BodyFat) ?? 0.00m, entrieCount),
                MuscleMass = SaveDivide(dataSets.Sum(x => x.MuscleMass) ?? 0.00m, entrieCount),
                HeartBeat = SaveDivide(dataSets.Sum(x => x.HeartBeat) ?? 0.00m, entrieCount),
                Bmi = SaveDivide(dataSets.Sum(x => x.BodyMassIndex) ?? 0.00m, entrieCount),
            };
        }

        private List<HealthDataStatistic> GetStatisticDataCollection(List<DateTime> affectedDates, ILookup<DateTime, UserHealthData> healthDataByDate)
        {
            var statistics = new List<HealthDataStatistic>();
            DateTime lastKeyWithValues = DateTime.MinValue;

            foreach (var date in affectedDates)
            {
                if(healthDataByDate[date].Any())
                {   
                    lastKeyWithValues = date;
                    var data = GetStatisticData(healthDataByDate[date], date);
                    statistics.Add(new HealthDataStatistic
                    {
                        Date = date,
                        HealthData = data,
                    });
                }
                else
                {
                    if(lastKeyWithValues != DateTime.MinValue)
                    {
                        var data = GetStatisticData(healthDataByDate[lastKeyWithValues], date);
                        statistics.Add(new HealthDataStatistic
                        {
                            Date = date,
                            HealthData = data,
                        });
                    }
                    else
                    {
                        statistics.Add(new HealthDataStatistic
                        {
                            Date = date,
                            HealthData = new HealthDataExportModel
                            {
                                Date = date,
                                Weight = 0,
                                Height = 0,
                                BodyFat = 0,
                                MuscleMass = 0,
                                HeartBeat = 0,
                                Bmi = 0,
                            }
                        });
                    }
                }     
            }

            return statistics;
        }

        private decimal? SaveDivide(decimal? sum, int count)
        {
            if (count <= 1)
            {
                return sum;
            }

            return sum / count;


        }

        #endregion

    }
}
