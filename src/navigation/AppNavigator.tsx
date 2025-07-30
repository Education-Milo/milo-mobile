import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@store/auth/auth.store';

import AuthNavigator from './AuthNavigator';
import UnAuthNavigator from './UnAuthNavigator';
import LoadingScreen from '@screens/LoadingScreen'; // Écran de chargement optionnel

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuthStore(state => state.accessToken);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Écouter les changements du token d'authentification
  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, [accessToken]);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      // Le store Zustand gère automatiquement la persistance
      // Pas besoin de vérifier AsyncStorage manuellement
      if (accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour mettre à jour le statut d'authentification
  const updateAuthStatus = (status: boolean) => {
    setIsAuthenticated(status);
  };

  // Affichage de l'écran de chargement pendant la vérification
  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
        {isAuthenticated ? (
          <Stack.Screen name="AuthStack">
            {() => <AuthNavigator onLogout={() => updateAuthStatus(false)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="UnAuthStack">
            {() => <UnAuthNavigator onLogin={() => updateAuthStatus(true)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}