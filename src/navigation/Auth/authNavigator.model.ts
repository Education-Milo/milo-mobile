export enum AuthScreenNames {
    HomeTabs = 'HomeTabs',
    Lesson = 'Lessons',
    Profile = 'Profile',
    Game = 'Game',
    Scan = 'Scan',
    CameraOrImport = 'CameraOrImport',
    LessonChapter = 'LessonChapter',
    ExercicesScreen = 'ExercicesScreen',
    MissionScreen = 'MissionScreen',
    ChatScreen = 'ChatScreen',
    FriendsScreen = 'FriendsScreen',
    EditProfileScreen = 'EditProfileScreen',

  }

  export type HomeTabsParamList = {
    Home: undefined;
    Lessons: undefined;
    Scan: undefined;
    Game: undefined;
    More: undefined;
    Profile: undefined;
    Friends: undefined;
    MissionScreen: undefined;
  };

  export type AuthStackParamList = {
    HomeTabs: undefined;
    Profile: undefined;
    Game: undefined;
    Lessons: undefined;
    Scan: undefined;
    CameraOrImport: { documentType: string };
    LessonChapter: { matiere: string };
    MissionScreen: undefined;
    ChatScreen: { lessonId: string; lessonTitle: string, context: string };
    // ChatScreen: { matiere: string; chapitre: string };
    ExercicesScreen: { matiere: string; chapitre: string };
    EditProfileScreen: undefined;
    FriendsScreen: undefined;
  };
