import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import AppInitializer from '@screens/AppInitializer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AppInitializer>
          <StatusBar style="auto" />
          <AppNavigator />
        </AppInitializer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
