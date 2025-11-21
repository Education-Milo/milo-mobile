import HomeScreen from '@screens/HomeScreen';
import LessonScreen from '@screens/LessonScreen';
import { View } from 'react-native';

export const TEACHER_TAB_SCREENS = [
  { name: 'Home', component: HomeScreen },
  { name: 'Lessons', component: LessonScreen },
  { name: 'Students', component: View }, // À créer
  { name: 'Profile', component: View },
  { name: 'More', component: View },
];

export const TEACHER_STACK_SCREENS = [
  'Profile',
  'Lesson',
  'LessonChapter',
  'ExercicesScreen',
  'ChatScreen',
  'Scan',
  'CameraOrImport',
];