import { IUserData } from './IUserData';
import { Login } from 'src/form';
export interface IAuthProps {
  isAuthenticated: boolean;
  userData: IUserData | null;
  login: Login;
  onLogin: (loginData: Login) => Promise<void>;
  onLogout: () => Promise<void>;
}
