import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@features/auth/screens/LoginScreen';
import {
  UnAuthScreenNames,
  UnAuthStackParamList,
} from '@app/navigation/UnAuth/unAuthNavigator.model';
import ForgotPasswordScreen from '@features/auth/screens/ForgotPasswordScreen';
import RegisterScreen from '@features/auth/screens/RegisterScreen';

const Stack = createNativeStackNavigator<UnAuthStackParamList>();

const UnAuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={UnAuthScreenNames.Login} component={LoginScreen} />
      <Stack.Screen
        name={UnAuthScreenNames.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={UnAuthScreenNames.Register}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default UnAuthNavigator;
