import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthStore } from '@store/auth/auth.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIAxios, { APIRoutes } from '@api/axios.api';
import qs from 'qs';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      loading: false,
      accessToken: '',

      login: async (email, password) => {
        try {
          const data = qs.stringify({
            grant_type: "password",
            username: email,
            password,
            scope: "",
            client_id: "",
            client_secret: "",
          });
          const response = await APIAxios.post(
            APIRoutes.POST_Login,
            data,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
          const token = response.data.access_token || response.data.accessToken;
          set({
            accessToken: token,
          });
          const { useUserStore } = await import('@store/user/user.store');
          await useUserStore.getState().getMe(true);
        } catch (error) {
          throw error;
        }
      },

      register: async (email, password, lastName, firstName, role) => {
        try {
          const response = await APIAxios.post(APIRoutes.POST_Register, {
            email,
            password,
            nom: lastName,
            prenom: firstName,
            role
          });
          const token = response.data.access_token || response.data.accessToken;
          if (!token) {
            throw new Error('No access token received from server');
          }
          set({
            accessToken: token,
          });
          const { useUserStore } = await import('@store/user/user.store');
          await useUserStore.getState().getMe(true);
        } catch (error) {
          console.error('Register error:', error);
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
        const { useUserStore } = await import('@store/user/user.store');
        useUserStore.getState().clearUserData();
        set({
          accessToken: '',
        });
      },

    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);