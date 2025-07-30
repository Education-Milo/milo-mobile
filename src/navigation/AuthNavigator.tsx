import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home/HomeScreen';
import ProfilScreen from '@screens/Profil/ProfileScreen';
import SelectDocumentScreen from '@screens/Scan/SelectDocumentScreen';
import CameraOrImportScreen from '@screens/Scan/CameraOrImportScreen';
import LessonScreen from '@screens/Lesson/LessonScreen';
import GameScreen from '@screens/Game/GameScreen';
import LessonChapter from '@screens/Lesson/LessonChapterScreent';
import ChatScreen from '@screens/ChatScreen';
import ExercicesScreen from '@screens/ExercicesScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AuthNavigatorProps {
  onLogout: () => void;
}

export default function AuthNavigator({ onLogout }: AuthNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraOrImport"
        component={CameraOrImportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scan"
        component={SelectDocumentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LessonChapter"
        component={LessonChapter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExercicesScreen"
        component={ExercicesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}