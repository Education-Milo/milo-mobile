import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import {
  UnAuthScreenNames,
  UnAuthStackParamList,
} from '@navigation/UnAuth/unAuthNavigator.model';
import ForgotPasswordScreen from '@screens/ForgotPasswordScreen';
import RegisterScreen from '@screens/RegisterScreen';

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
