import { IUserData } from './IUserData';
import { Login, Registration } from 'src/form';
export interface IAuthProps {
  isAuthenticated: boolean;
  userData: IUserData | null;
  login: Login;
  onLogin: (loginData: Login) => Promise<void>;
  onRegistration: (registration: Omit<Registration, 'confirmPassword'>) => Promise<void>;
  onLogout: () => Promise<void>;
}
