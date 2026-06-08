import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '@app/navigation/Auth/AuthNavigator';
import UnAuthNavigator from '@app/navigation/UnAuth/unAuthNavigator';
import {
  RootScreenNames,
  RootStackParamList,
} from '@app/navigation/Root/rootNavigator.model';
import { useAuthStore } from '@features/auth/store/auth/auth.store';
import { colors } from '@shared/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const RootNavigator = () => {
  const accessToken = useAuthStore(state => state.accessToken);


  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!accessToken ? (
          <Stack.Screen
            name={RootScreenNames.UnAuth}
            component={UnAuthNavigator}
          />
        ) : (
          <Stack.Screen name={RootScreenNames.Auth} component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
