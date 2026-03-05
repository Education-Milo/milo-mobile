import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthStore } from '@store/auth/auth.model';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIAxios, { APIRoutes } from '@api/axios.api';
import { jwtDecode } from 'jwt-decode';
import qs from 'qs';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      loading: false,
      accessToken: '',

      isTokenExpired: () => {
        const { accessToken } = get();
        if (!accessToken) return true;
        const TOKEN_EXPIRY_BUFFER = 5 * 60;
        try {
          const decoded: any = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;
          return decoded.exp < currentTime + TOKEN_EXPIRY_BUFFER;
        } catch (error) {
          return true;
        }
      },

      ensureTokenValid: async () => {
        if (get().isTokenExpired()) {
          await get().logout();
          throw new Error('TOKEN_EXPIRED');
        }
      },

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

      register: async (email, password, last_name, first_name, role, classe) => {
        try {
          const response = await APIAxios.post(APIRoutes.POST_Register, {
            email,
            password,
            first_name,
            last_name,
            role,
            class_: classe,
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

      forgotPassword: async (email) => {
          await APIAxios.post(APIRoutes.POST_ForgotPassword, { email });
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
