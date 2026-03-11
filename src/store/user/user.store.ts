import { create } from 'zustand';
import { UserStore, User } from '@store/user/user.model';
import APIAxios, { APIRoutes } from '@api/axios.api';

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
      set({
        user: {
          ...response.data,
          classe: response.data.class_,
          Interests: response.data.Interests || response.data.interests || [],
        },
        lastUserFetch: now,
        loading: false,
      });
      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  addPoints: (amount: number) => {
    set((state) => {
      if(!state.user) return {};
      return {
        user: {
          ...state.user,
          points: (state.user.points || 0) + amount,
        },
      };
    });
  },

  addXp: (amount: number) => {
    set((state) => {
      if(!state.user) return {};
      return {
        user: {
          ...state.user,
          xp: (state.user.xp || 0) + amount,
        },
      };
    });
  },

  updateUser: async (userData: Partial<User>) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error("Utilisateur non connecté");

    try {
      set({ loading: true });
      const {classe, ...rest} = userData;
      const response = await APIAxios.put(APIRoutes.PUT_Update_user(currentUser.id), {
        ...rest,
        class_: userData.classe,
      });
      set({
        user: {
          ...currentUser,
          ...response.data,
          Interests: currentUser.Interests,
          classe: response.data.class_,
        },
        loading: false,
      });

      return response.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  addUserInterest: async (interestName: string) => {
    const currentUser = get().user;
    if (!currentUser) {
      throw new Error('No user logged in');
    }
    const tempId = Date.now();
    const tempInterest = { id: tempId, name: interestName };
    set({
      user: { ...currentUser,
        Interests: [...(currentUser.Interests || []), tempInterest] }
      });
    try {
      const response = await APIAxios.post(APIRoutes.POST_Add_User_Interest(currentUser.id), { name: interestName.trim().toLowerCase() });
      const newUser = get().user;
      const newInterest = response.data
      console.log("Intérêt ajouté avec succès", newInterest);
      if (newUser) {
        set({
          user: { ...newUser,
            Interests: newUser.Interests?.map(i => i.id === tempId ? newInterest : i) || []
          },
        });
    }
    } catch (error) {
      set({
        user: {
          ...currentUser,
          Interests: currentUser.Interests
        }
      })
      set({ loading: false });
      throw error;
    }
  },

  deleteUserInterest: async (interestId: number) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('No user logged in');
    try {
      set({ loading: true });
      await APIAxios.delete(APIRoutes.DELETE_User_Interest(currentUser.id, interestId));
      set({
        user: {
          ...currentUser,
          Interests: currentUser.Interests?.filter(i => i.id !== interestId) || []
        },
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  getFullName: () => {
    const user = get().user;
    if (!user) return '';
    return `${user.first_name} ${user.last_name}`.trim();
  },

  getInitials: () => {
    const user = get().user;
    if (!user) return '';
    const firstInitial = user.first_name?.charAt(0)?.toUpperCase() || '';
    const lastInitial = user.last_name?.charAt(0)?.toUpperCase() || '';
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


//   refreshUserData: async () => {
//     const promises = [
//       get().getMe(true),
//       get().getUserStats(true)
//     ];
//     await Promise.all(promises);
//   },