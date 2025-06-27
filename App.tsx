import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import AppInitializer from '@screens/AppInitializer';

export default function App() {
  return (
    <AppInitializer>
      <AppNavigator />
      <StatusBar style="auto" />
    </AppInitializer>
  );
}
