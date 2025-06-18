import { AxiosResponse } from 'axios';

export interface AuthState {
  loading: boolean;
  accessToken: string;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, lastName: string, firstName: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  // verifyEmail: (email: string) => Promise<AxiosResponse>;
}

export type AuthStore = AuthState & AuthActions;