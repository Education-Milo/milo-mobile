import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/Login/LoginScreen';
import RegisterScreen from '@screens/Register/RegisterScreen';
import ForgetPasswordScreen from '@screens/ForgetPassword/ForgetPasswordScreen';

export type UnAuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<UnAuthStackParamList>();

interface UnAuthNavigatorProps {
  onLogin: () => void;
}

export default function UnAuthNavigator({ onLogin }: UnAuthNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'none' }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgetPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}