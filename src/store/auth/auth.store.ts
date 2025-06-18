import { create } from 'zustand';
import { AuthStore } from '@store/auth/auth.model';
import APIAxios, { APIRoutes } from '@api/axios.api';

export const useAuthStore = create<AuthStore>((set) => ({
  loading: false,
  accessToken: '',

  login: async (email, password) => {
    try {
      const response = await APIAxios.post(APIRoutes.POST_Login, {
        email,
        password,
      });
      set({
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      throw error;
    }
  },

  register: async (email, password, lastName, firstName, role) => {
    try {
      const response = await APIAxios.post(APIRoutes.POST_Register, {
        email,
        password,
        lastName,
        firstName,
        role
      });
      set({
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      throw error;
    }
  },

  forgetPassword: async (email) => {
    try {
      await APIAxios.post(APIRoutes.POST_ForgotPassword, {
        email,
      });
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    set({
      accessToken: '',
    });
  },

  // verifyEmail: async (email) => {
  //   try {
  //     const response = await APIAxios.post(APIRoutes.POST_RequestConfirmEmail, {
  //       email,
  //     });
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

}));

