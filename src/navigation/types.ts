import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Scan: undefined;
  CameraOrImport: { documentType: string };
  Profile: undefined;
  Notifications: undefined;
  Settings: undefined;
  Lesson: undefined;
  Game: undefined;
  LessonChapter: { matiere: string };
  ChatScreen: { matiere: string; chapitre: string };
  ExercicesScreen: { matiere: string; chapitre: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;
export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;
