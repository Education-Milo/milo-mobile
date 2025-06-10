import React from 'react';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home/HomeScreen';
import LoginScreen from '@screens/Login/LoginScreen';
import RegisterScreen from '@screens/Register/RegisterScreen';
import { RootStackParamList } from './types';
import SelectDocumentScreen from '@screens/Scan/SelectDocumentScreen';
import CameraOrImportScreen from '@screens/Scan/CameraOrImportScreen';
import ProfilScreen from '@screens/Profil/ProfileScreen';
import ForgetPasswordScreen from '@screens/ForgetPassword/ForgetPasswordScreen';
import LessonScreen from '@screens/Lesson/LessonScreen';
import GameScreen from '@screens/Game/GameScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ForgotPassword'
          component={ForgetPasswordScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Profile'
          component={ProfilScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='CameraOrImport'
          component={CameraOrImportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Scan'
          component={SelectDocumentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Lesson'
          component={LessonScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Game'
          component={GameScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
