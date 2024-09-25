export interface IUserData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  displayName: string;
  dateOfBirth: string;
  jwtData: IJwtData;
}

export interface IJwtData {
  jwtToken: string;
  refreshToken: string;
}

export interface IRegistrationResult {
  success: boolean;
}
