import axios, {
  AxiosError,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';
import { API_URL } from '@env';

const APIAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
} as CreateAxiosDefaults);

APIAxios.interceptors.request.use(
  async config => {
    const { useAuthStore } = await import('@store/auth/auth.store');
    const accessToken = useAuthStore.getState().accessToken;
    try {
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

APIAxios.interceptors.response.use(
  res => {
    return res;
  },
  (err: AxiosError) => {
    if (
      err.response?.status === 401 &&
      (err.response as any)?.data?.message !== 'CODE_NOT_CORRECT'
    ) {
      console.error('Unauthorized access - redirecting to login');
    }

    return Promise.reject(err);
  }
);

export const APIRoutes = {
  POST_Register: '/register',
  POST_Login: '/token',
  POST_ForgotPassword: '/auth/forgot-password',
  POST_RequestConfirmEmail: '/auth/request-confirm-email',
  GET_Me: '/users/me',

  /* AUTH */
  //   POSTLogin: (): AxiosRequestConfig => ({method: 'POST', url: '/auth/login'}),
  //   GETCurrentUser: (): AxiosRequestConfig => ({method: 'GET', url: '/users/me'}),
  //   GETCurrentUserCode: (): AxiosRequestConfig => ({method: 'POST', url: '/users/identification-code'}),
  //   PATCHChangePassword: (): AxiosRequestConfig => ({method: 'POST', url: '/auth/change-password'}),
  //   PATCHCurrentUser: (): AxiosRequestConfig => ({method: 'PATCH', url: '/users/me'}),
  /* ---- */
};

export default APIAxios;
