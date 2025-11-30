import axios, { AxiosError, CreateAxiosDefaults } from 'axios';
import { API_URL } from '@env';

const APIAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
} as CreateAxiosDefaults);


const PUBLIC_ROUTES = [
  '/register',
  '/token',
  '/forgotPassword',
  '/auth/request-confirm-email',
];

const isPublicRoute = (url?: string): boolean => {
  if (!url) return false;
  return PUBLIC_ROUTES.some(route => url.includes(route));
};

APIAxios.interceptors.request.use(
  async config => {
    const { useAuthStore } = await import('@store/auth/auth.store');
    const accessToken = useAuthStore.getState().accessToken;
    try {
      if (!isPublicRoute(config.url)) {
        await useAuthStore.getState().ensureTokenValid();
      }
      if (accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
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
    if (err.config){
      console.log(
        `Error with ${err.config.method?.toUpperCase()} to ${
          APIAxios.defaults.baseURL
        }${err.config.url}`
      );
    }
    if (err.response){
      const { useAuthStore } = await import('@store/auth/auth.store');
      if (err.response.status === 403) {
        await useAuthStore.getState().logout();
      }
    } else if (err.request) {
      console.error('Error request:', err.request);
    } else {
      console.error('Error message:', err.message);
    }
    const originalRequest = err.config

    if (err.response?.status === 401 ) {
      if (isPublicRoute(originalRequest?.url)) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export const APIRoutes = {
  POST_Register: '/register',
  POST_Login: '/token',
  POST_ForgotPassword: '/forgotPassword',
  POST_RequestConfirmEmail: '/auth/request-confirm-email',
  GET_Me: '/users/me',

  PUT_UpdateUser: '/users/{userId}',

  POST_CREATE_QCM: '/qcm',


  /* COURSES */
  GET_Course: '/courses',
  GET_Subjects: '/courses/subjects',
  GET_RecentCourses: '/courses/recent',

  /* AUTH */
  //   POSTLogin: (): AxiosRequestConfig => ({method: 'POST', url: '/auth/login'}),
  //   GETCurrentUser: (): AxiosRequestConfig => ({method: 'GET', url: '/users/me'}),
  //   GETCurrentUserCode: (): AxiosRequestConfig => ({method: 'POST', url: '/users/identification-code'}),
  //   PATCHChangePassword: (): AxiosRequestConfig => ({method: 'POST', url: '/auth/change-password'}),
  //   PATCHCurrentUser: (): AxiosRequestConfig => ({method: 'PATCH', url: '/users/me'}),
  /* ---- */
};

export default APIAxios;
