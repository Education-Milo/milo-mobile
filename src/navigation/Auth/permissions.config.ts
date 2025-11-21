export enum UserRole {
    STUDENT = 'Élève',
    PARENT = 'Parent',
    TEACHER = 'Prof',
    ADMIN = 'Admin',
  }

  export type ScreenPermission = {
    roles: UserRole[];
  };

  export const SCREEN_PERMISSIONS: Record<string, ScreenPermission> = {
    // Screens accessibles à tous
    Home: { roles: [UserRole.STUDENT, UserRole.PARENT, UserRole.TEACHER, UserRole.ADMIN] },
    Profile: { roles: [UserRole.STUDENT, UserRole.PARENT, UserRole.TEACHER, UserRole.ADMIN] },

    // Screens pour élèves
    Lessons: { roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN] },
    Game: { roles: [UserRole.STUDENT, UserRole.ADMIN] },
    Scan: { roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN] },
    ExercicesScreen: { roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN] },
    MissionScreen: { roles: [UserRole.STUDENT, UserRole.ADMIN] },
    ChatScreen: { roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN] },
    LessonChapter: { roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN] },
    CameraOrImport: { roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN] },

    // Screens pour parents
    Friends: { roles: [UserRole.STUDENT, UserRole.PARENT, UserRole.ADMIN] },
    ChildProgress: { roles: [UserRole.PARENT, UserRole.ADMIN] },
    ParentDashboard: { roles: [UserRole.PARENT, UserRole.ADMIN] },

    // Screens spécifiques profs
    TeacherDashboard: { roles: [UserRole.TEACHER, UserRole.ADMIN] },
    StudentManagement: { roles: [UserRole.TEACHER, UserRole.ADMIN] },

    // Screens admin
    AdminPanel: { roles: [UserRole.ADMIN] },
    UserManagement: { roles: [UserRole.ADMIN] },
  };

  export const hasAccessToScreen = (userRole: UserRole | null, screenName: string): boolean => {
    if (!userRole) return false;
    const permission = SCREEN_PERMISSIONS[screenName];
    return permission ? permission.roles.includes(userRole) : false;
  };