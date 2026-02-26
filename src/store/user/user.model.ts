export type UserRole = 'Enfant' | 'Prof' | 'Parent' | 'Admin' ;
export type ClassType = '6eme' | '5eme' | '4eme' | '3eme';
export interface User {

    id: number;
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

    avatarId: number;
    Interests?: UserInterest[];
  }

  export interface UserInterest {
    id: number;
    name: string;
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
    addUserInterest: (interestName: string) => Promise<void>;
    deleteUserInterest: (interestId: number) => Promise<void>;

    // getUserStats: (forceRefresh?: boolean) => Promise<UserStats>;
    // refreshUserData: () => Promise<void>;

    addPoints:(amount: number) => void;
    addXp:(amount: number) => void;

    clearUserData: () => void;
    getFullName: () => string;
    getInitials: () => string;
  }
  export type UserStore = UserState & UserActions;