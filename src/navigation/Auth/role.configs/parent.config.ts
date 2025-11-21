import HomeScreen from '@screens/HomeScreen';
import ParentDashboardScreen from '@screens/ParentDashboardScreen';
import { View } from 'react-native';

export const PARENT_TAB_SCREENS = [
  { name: 'Home', component: ParentDashboardScreen },
  { name: 'Children', component: View }, // À créer
  { name: 'Progress', component: View }, // À créer
  { name: 'Profile', component: View },
];

export const PARENT_STACK_SCREENS = [
  'Profile',
];