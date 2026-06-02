export enum AuthScreenNames {
  HomeTabs = "HomeTabs",
  Lesson = "Lessons",
  Profile = "Profile",
  Duel = "Duel",
  Scan = "Scan",
  CameraOrImport = "CameraOrImport",
  LessonChapter = "LessonChapter",
  ExercicesScreen = "ExercicesScreen",
  GeneratedExerciseScreen = "GeneratedExerciseScreen",
  GeneratedQCMScreen = "GeneratedQCMScreen",
  MissionScreen = "MissionScreen",
  ChatScreen = "ChatScreen",
  FriendsScreen = "FriendsScreen",
  EditProfileScreen = "EditProfileScreen",
  Settings = "Settings",
}

export type HomeTabsParamList = {
  Home: undefined;
  Lessons: undefined;
  Scan: undefined;
  Duel: undefined;
  More: undefined;
  Profile: undefined;
  Friends: undefined;
  MissionScreen: undefined;
};

export type AuthStackParamList = {
  HomeTabs: undefined;
  Profile: undefined;
  Duel: undefined;
  Lessons: undefined;
  Scan: undefined;
  CameraOrImport: { documentType: string };
  LessonChapter: { matiere: string };
  MissionScreen: undefined;
  ChatScreen: { lessonId: string; lessonTitle: string; context: string };
  ExercicesScreen: { lessonId: string };
  GeneratedExerciseScreen: {
    statement: string;
    correction?: string;
    conversationId?: string;
  };
  GeneratedQCMScreen: {
    questions: Array<{
      id?: number;
      question: string;
      options: string[];
      correctAnswer?: string;
      correct_answer?: string;
      answer?: string;
    }>;
  };
  EditProfileScreen: undefined;
  FriendsScreen: undefined;
  Settings: undefined;
};
