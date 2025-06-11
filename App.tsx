import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F1' }}>
        <AppNavigator />
        <StatusBar style="auto"/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
