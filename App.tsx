import { StatusBar } from 'expo-status-bar';
import AppInitializer from '@screens/AppInitializer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import RootNavigator from '@navigation/Root/rootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AppInitializer>
          <StatusBar style="auto" />
          <RootNavigator />
        </AppInitializer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
