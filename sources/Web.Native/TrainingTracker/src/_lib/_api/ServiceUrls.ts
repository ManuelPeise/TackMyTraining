export const serviceUrls = {
  auth: {
    login: 'LoginService/Login',
    registration: 'UserRegistration/RegisterUser',
  },
  health: {
    getLastDataSet: 'HealthData/GetLastHealthDataSet',
    statisticData: 'HealthData/GetStatisticData',
    dataImport: 'HealthDataImport/Import',
  },
  dashBoard: {
    getDashboardTiles: 'Dashboard/LoadDashboardTiles',
    updateDashboardConfiguration: 'Dashboard/UpdateDashboardSettings',
  },
  training: {
    getTrainingAvailableCategorizedConfigurations: 'TrainingService/GetTrainingAvailableCategorizedConfigurations',
  },
  profile: {
    getProfile: 'ProfileService/GetProfile',
    postProfileUpdate: 'ProfileService/UpdateProfile',
    postContactData: 'ProfileService/UpdateContact',
  },
};
