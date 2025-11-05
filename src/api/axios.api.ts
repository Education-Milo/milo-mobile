import axios, {
  AxiosError,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';
import { API_URL } from '@env';
import { use } from 'react';

const APIAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
} as CreateAxiosDefaults);

APIAxios.interceptors.request.use(
  async config => {
    const { useAuthStore } = await import('@store/auth/auth.store');
    try {
      await useAuthStore.getState().ensureTokenValid();
      const accessToken = useAuthStore.getState().accessToken;
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
  async (err: AxiosError) => {
    if (err.response?.status === 401 ) {
      console.error('Unauthorized access - token expired, logging out');

      try {
        const { useAuthStore } = await import('@store/auth/auth.store');
        await useAuthStore.getState().logout();
      } catch (logoutError) {
        console.error('Error during automatic logout:', logoutError);
      }
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

  POST_CREATE_QCM: '/qcm',

  /* AUTH */
  //   POSTLogin: (): AxiosRequestConfig => ({method: 'POST', url: '/auth/login'}),
  //   GETCurrentUser: (): AxiosRequestConfig => ({method: 'GET', url: '/users/me'}),
  //   GETCurrentUserCode: (): AxiosRequestConfig => ({method: 'POST', url: '/users/identification-code'}),
  //   PATCHChangePassword: (): AxiosRequestConfig => ({method: 'POST', url: '/auth/change-password'}),
  //   PATCHCurrentUser: (): AxiosRequestConfig => ({method: 'PATCH', url: '/users/me'}),
  /* ---- */
};

export default APIAxios;
