import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabsNavigator from '@navigation/Auth/HomeTabsNavigator';
import {
  AuthScreenNames,
  AuthStackParamList,
} from '@navigation/Auth/authNavigator.model';
import ProfileScreen from '@screens/ProfileScreen';
import ExercicesScreen from '@screens/ExercicesScreen';
import LessonScreen from '@screens/LessonScreen';
import SelectDocumentScreen from '@screens/SelectDocumentScreen';
import CameraOrImportScreen from '@screens/CameraOrImportScreen';
import LessonChapterScreen from '@screens/LessonChapterScreen';
import MissionsScreen from '@screens/MissionScreen';
import ChatScreen from '@screens/ChatScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {

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
        <Stack.Screen
            name={AuthScreenNames.Profile}
            component={ProfileScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.Game}
            component={ExercicesScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.Lesson}
            component={LessonScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.Scan}
            component={SelectDocumentScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.CameraOrImport}
            component={CameraOrImportScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.LessonChapter}
            component={LessonChapterScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.ExercicesScreen}
            component={ExercicesScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.MissionScreen}
            component={MissionsScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.ChatScreen}
            component={ChatScreen}
        />
        <Stack.Screen
            name={AuthScreenNames.FriendsScreen}
            component={MissionsScreen}
        />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
