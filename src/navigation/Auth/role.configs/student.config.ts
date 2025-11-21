import HomeScreen from '@screens/HomeScreen';
import LessonScreen from '@screens/LessonScreen';
import GameScreen from '@screens/GameScreen';
import SelectDocumentScreen from '@screens/SelectDocumentScreen';
import MissionsScreen from '@screens/MissionScreen';
import { View } from 'react-native';

export const STUDENT_TAB_SCREENS = [
  { name: 'Home', component: HomeScreen },
  { name: 'Lessons', component: LessonScreen },
  { name: 'Scan', component: SelectDocumentScreen },
  { name: 'Game', component: GameScreen },
  { name: 'Friends', component: View },
  { name: 'Profile', component: View },
  { name: 'MissionScreen', component: MissionsScreen },
  { name: 'More', component: View },
];

export const STUDENT_STACK_SCREENS = [
  'Profile',
  'Game',
  'Lesson',
  'Scan',
  'CameraOrImport',
  'LessonChapter',
  'ExercicesScreen',
  'MissionScreen',
  'ChatScreen',
];