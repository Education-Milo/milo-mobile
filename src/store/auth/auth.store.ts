import { create } from 'zustand';
import { AuthStore } from '@store/auth/auth.model';
import APIAxios, { APIRoutes } from '@api/axios.api';
import qs from 'qs';

export const useAuthStore = create<AuthStore>((set) => ({
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
      set({
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      throw error;
    }
  },

  register: async (email, password, lastName, firstName, role) => {
    try {
      console.log(APIRoutes.POST_Register);
      const response = await APIAxios.post(APIRoutes.POST_Register, {
        email,
        password,
        nom: lastName,
        prenom: firstName,
        role
      });
      set({
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      console.log('email:', email, 'password:', password, 'lastName:', lastName, 'firstName:', firstName, 'role:', role);
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

