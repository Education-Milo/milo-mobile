import React, { useEffect, ReactNode } from 'react';
import { StyleSheet, AppState, AppStateStatus } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from '@hooks/usefonts';
import { useAuthStore } from '@store/auth/auth.store'; // ← AJOUT

SplashScreen.preventAutoHideAsync();

interface AppInitializerProps {
  children: ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const { fontsLoaded, error } = useFonts();

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [fontsLoaded]);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        const { isTokenExpired, logout, accessToken } = useAuthStore.getState();
        // Si l'utilisateur est connecté
        if (accessToken) {
          // Vérifier si le token est expiré
          if (isTokenExpired()) {
            console.log('Token expired on app resume, logging out');
            await logout();
          }
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
});

export default AppInitializer;