import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabsNavigator from '@navigation/Auth/HomeTabsNavigator';
import {
  AuthScreenNames,
  AuthStackParamList,
} from '@navigation/Auth/authNavigator.model';
import { useUserStore } from '@store/user/user.store';
import { getNavigationConfigForRole } from './role.configs';

// Import des screens
import ProfileScreen from '@screens/ProfileScreen';
import ExercicesScreen from '@screens/ExercicesScreen';
import LessonScreen from '@screens/LessonScreen';
import SelectDocumentScreen from '@screens/SelectDocumentScreen';
import CameraOrImportScreen from '@screens/CameraOrImportScreen';
import LessonChapterScreen from '@screens/LessonChapterScreen';
import MissionsScreen from '@screens/MissionScreen';
import ChatScreen from '@screens/ChatScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

// Mapping des noms de screens vers les composants
const SCREEN_COMPONENTS = {
  Profile: ProfileScreen,
  Game: ExercicesScreen,
  Lesson: LessonScreen,
  Lessons: LessonScreen,
  Scan: SelectDocumentScreen,
  CameraOrImport: CameraOrImportScreen,
  LessonChapter: LessonChapterScreen,
  ExercicesScreen: ExercicesScreen,
  MissionScreen: MissionsScreen,
  ChatScreen: ChatScreen,
};

const AuthNavigator = () => {
  const userRole = useUserStore((state) => state.getRole());
  const navigationConfig = getNavigationConfigForRole(userRole);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={AuthScreenNames.HomeTabs}
        component={HomeTabsNavigator}
      />

      {navigationConfig.stackScreens.map((screenName, index) => {
        const Component = SCREEN_COMPONENTS[screenName as keyof typeof SCREEN_COMPONENTS];

        if (!Component) {
          console.warn(`Component not found for screen: ${screenName}`);
          return null;
        }

        return (
          <Stack.Screen
            key={`${screenName}-${index}`}
            name={screenName as keyof AuthStackParamList}
            component={Component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default AuthNavigator;