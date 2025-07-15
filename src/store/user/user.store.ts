import { create } from 'zustand';
import { UserStore, User, UserStats } from '@store/user/user.model';
import APIAxios, { APIRoutes } from '@api/axios.api';

// Durée de cache en millisecondes (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

export const useUserStore = create<UserStore>((set, get) => ({
  loading: false,
  user: null,
  userStats: null,
  lastUserFetch: 0,
  lastStatsFetch: 0,

  getMe: async (forceRefresh = false) => {
    const state = get();
    const now = Date.now();
    if (!forceRefresh && state.user && (now - state.lastUserFetch) < CACHE_DURATION) {
      return state.user;
    }

    try {
      set({ loading: true });
      const response = await APIAxios.get(APIRoutes.GET_Me);
      const userData: User = response.data;
      set({
        user: userData,
        lastUserFetch: now,
        loading: false,
      });
      return userData;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

//   getUserStats: async (forceRefresh = false) => {
//     const state = get();
//     const now = Date.now();
//     // Si on a déjà les stats et qu'elles ne sont pas expirées, les retourner
//     if (!forceRefresh && state.userStats && (now - state.lastStatsFetch) < CACHE_DURATION) {
//       return state.userStats;
//     }

//     try {
//       set({ loading: true });
//       const response = await APIAxios.get(APIRoutes.GET_UserStats); // À ajouter dans votre API
//       const statsData: UserStats = response.data;
//       set({
//         userStats: statsData,
//         lastStatsFetch: now,
//         loading: false,
//       });
//       return statsData;
//     } catch (error) {
//       set({ loading: false });
//       throw error;
//     }
//   },

//   updateUser: async (userData: Partial<User>) => {
//     try {
//       set({ loading: true });
//       const response = await APIAxios.put(APIRoutes.PUT_UpdateUser, userData); // À ajouter dans votre API
//       const updatedUser: User = response.data;
//       set({
//         user: updatedUser,
//         lastUserFetch: Date.now(),
//         loading: false,
//       });
//       return updatedUser;
//     } catch (error) {
//       set({ loading: false });
//       throw error;
//     }
//   },

//   refreshUserData: async () => {
//     const promises = [
//       get().getMe(true),
//       get().getUserStats(true)
//     ];
//     await Promise.all(promises);
//   },

  getFullName: () => {
    const user = get().user;
    if (!user) return '';
    return `${user.prenom} ${user.nom}`.trim();
  },

  // Getter pour les initiales
  getInitials: () => {
    const user = get().user;
    if (!user) return '';
    const firstInitial = user.prenom?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.nom?.charAt(0)?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  },


  clearUserData: () => {
    set({
      user: null,
      userStats: null,
      lastUserFetch: 0,
      lastStatsFetch: 0,
    });
  },
}));