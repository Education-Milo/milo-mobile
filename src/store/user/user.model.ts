export type UserRole = 'Enfant' | 'Professeur' | 'Parent' | 'Admin' ;
export type ClassType = '6ème' | '5ème' | '4ème' | '3ème';
export interface User {

    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    classe: ClassType;
    class_?: ClassType;

    level: number;
    points: number;
    xp: number;
    maxXp: number;
    streak: number;

    interests: string[];

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