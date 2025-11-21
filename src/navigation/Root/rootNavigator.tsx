import React, { useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '@navigation/Auth/AuthNavigator';
import UnAuthNavigator from '@navigation/UnAuth/unAuthNavigator';
import {
  RootScreenNames,
  RootStackParamList,
} from '@navigation/Root/rootNavigator.model';
import { useAuthStore } from '@store/auth/auth.store';
import { useUserStore } from '@store/user/user.store';
import { colors } from '@theme/colors';
import { ActivityIndicator, View } from 'react-native';

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
  const { user, loading, getMe } = useUserStore();

  // Récupérer les infos utilisateur au montage si connecté
  useEffect(() => {
    if (accessToken && !user) {
      getMe();
    }
  }, [accessToken, user]);

  // Afficher un loader pendant la récupération des infos utilisateur
  if (accessToken && loading && !user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!accessToken ? (
          <Stack.Screen
            name={RootScreenNames.UnAuth}
            component={UnAuthNavigator}
          />
        ) : (
          <Stack.Screen
            name={RootScreenNames.Auth}
            component={AuthNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;