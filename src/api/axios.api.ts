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
    try {
      if (!isPublicRoute(config.url)) {
        await useAuthStore.getState().ensureTokenValid();
      }
      const accessToken = useAuthStore.getState().accessToken;
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
    } else if (err.request) {
      console.error('Error request:', err.request);
    } else {
      console.error('Error message:', err.message);
    }
    const originalRequest = err.config

    if (err.response?.status === 401 ) {
      if (!isPublicRoute(originalRequest?.url)) {
        const { useAuthStore } = await import('@store/auth/auth.store');
        await useAuthStore.getState().logout();
      }
      return Promise.reject(err);
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

  PUT_Update_user: (userId: number) => `/users/${userId}`,
  POST_Add_User_Interest: (userId: number) => `/users/${userId}/interests/`,
  DELETE_User_Interest: (userId: number, interestId: number) => `/users/${userId}/interests/${interestId}`,
  POST_CREATE_QCM: '/qcm',


  /* COURSES */
  GET_Subjects: '/get_subjects',
  GET_Courses: '/get_courses',
  GET_Chapters: '/get_chapters',
  GET_Lessons: '/get_lessons',
  POST_Chat_Lesson: '/chat_lesson',
  POST_QCM_Lesson: '/qcm_lesson',
};

export default APIAxios;
