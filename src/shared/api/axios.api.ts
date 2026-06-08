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
    const { useAuthStore } = await import('@features/auth/store/auth/auth.store');
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
      const { useAuthStore } = await import('@features/auth/store/auth/auth.store');
    } else if (err.request) {
      console.error('Error request:', err.request);
    } else {
      console.error('Error message:', err.message);
    }
    const originalRequest = err.config

    if (err.response?.status === 401 ) {
      if (!isPublicRoute(originalRequest?.url)) {
        const { useAuthStore } = await import('@features/auth/store/auth/auth.store');
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
  GET_User_Search: '/users/search',
  GET_User_By_Username: (username: string) => `/users/by-username/${username}`,
  GET_User_By_Id: (userId: number) => `/users/${userId}`,
  GET_User_Online_Status: (ids: string) => `/users/presence?ids=${ids}`,

  /* FRIENDS */
  GET_Friends: '/friends',
  DELETE_FRIEND: (friendId: number) => `/friends/${friendId}`,
  POST_SEND_FRIEND_REQUEST: (friendId: number) => `/friends/${friendId}`,
  PATCH_ACCEPT_FRIEND_REQUEST: (friendId: number) => `/friends/${friendId}/accept`,
  PATCH_BLOCK_FRIEND: (friendId: number) => `/friends/${friendId}/block`,


  /* DUEL */
  POST_DUEL_Request: (target_user_id: number) => `/duels/challenge/${target_user_id}`,
  POST_DUEL_Accept: (challenge_id: number) => `/duels/challenge/${challenge_id}/accept`,
  POST_DUEL_Decline: (challenge_id: number) => `/duels/challenge/${challenge_id}/decline`,
  GET_DUEL_Pending: '/duels/pending',
  GET_DUEL_History: '/duels/history',
  GET_DUEL_Stats: '/duels/stats',

  /* OCR */
  POST_OCR_Report_Card: '/ocr/report_card',
  POST_OCR_Exercise_generation: '/ocr/exercise_generation',
  POST_OCR_Course_qcm: '/ocr/course_qcm',

  /* COURSES */
  GET_Subjects: '/get_subjects',
  GET_Courses: '/get_courses',
  GET_Chapters: '/get_chapters',
  GET_Lessons: '/get_lessons',
  POST_QCM_Lesson: '/qcm_lesson',

  /* Courses with Milo */
  POST_Chat_Lesson: '/chat_lesson',
  POST_Chat_Question: '/chat_lesson_question',
  POST_Free_Chat: '/chat',
};

export default APIAxios;
