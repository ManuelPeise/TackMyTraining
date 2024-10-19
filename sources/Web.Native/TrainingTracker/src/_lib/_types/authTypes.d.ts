import moment from 'moment';
import { JwtData, UserData, UserInfo } from '../User/types';

export type Auth = {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  jwtData: JwtData;
  error: string;
  isLoading: boolean;
  onLogin: (loginData: Login) => Promise<boolean>;
  onLogout: () => void;
};

export type Login = {
  email: string;
  password: string;
  remember?: boolean;
};

export type Registration = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: moment.Moment | null;
  password: string;
  confirmPassword: string;
};
