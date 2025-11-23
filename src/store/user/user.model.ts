import { AxiosResponse } from 'axios';

export type UserRole = 'USER' | 'PROF' | 'PARENT' | 'ADMIN' ;
export type ClassType = '6ème' | '5ème' | '4ème' | '3ème';
export interface User {

    id: string;
    email: string;
    prenom: string;
    nom: string;
    role: string;
    classe: ClassType;

    level: number;
    points: number;
    xp: number;
    maxXp: number;
    streak: number;

    interests: string[]; // ex: ['Football', 'Minecraft', 'Espace']

    avatarId: number;
  }
  export interface UserStats {
    documentsScanned: number;
    challengesCompleted: number;
    currentStreak: number;
    totalPoints: number;
    weeklyProgress: number[];
    monthlyProgress: number[];
  }
  export interface UserState {
    loading: boolean;
    user: User | null;
    userStats: UserStats | null;
    lastUserFetch: number;
    lastStatsFetch: number;
  }

  export interface UserActions {
    getMe: (forceRefresh?: boolean) => Promise<User>;
    updateUser: (userData: Partial<User>) => Promise<User>;

    // getUserStats: (forceRefresh?: boolean) => Promise<UserStats>;
    // refreshUserData: () => Promise<void>;

    addPoints:(amount: number) => void;
    addXp:(amount: number) => void;

    clearUserData: () => void;
    getFullName: () => string;
    getInitials: () => string;
  }
  export type UserStore = UserState & UserActions;