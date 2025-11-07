export enum AuthScreenNames {
    HomeTabs = 'HomeTabs',
    Lesson = 'Lessons',
    Profile = 'Profile',
    Game = 'Game',
    Scan = 'Scan',
    CameraOrImport = 'CameraOrImport',
    LessonChapter = 'LessonChapter',
    ExercicesScreen = 'ExercicesScreen',

  }

  export type HomeTabsParamList = {
    Home: undefined;
    Lessons: undefined;
    Scan: undefined;
    Game: undefined;
    Profile: undefined;
  };

  export type AuthStackParamList = {
    HomeTabs: undefined;
    Profile: undefined;
    Game: undefined;
    Lessons: undefined;
    Scan: undefined;
    CameraOrImport: { documentType: string };
    LessonChapter: { matiere: string };
    // ChatScreen: { matiere: string; chapitre: string };
    ExercicesScreen: { matiere: string; chapitre: string };
  };
