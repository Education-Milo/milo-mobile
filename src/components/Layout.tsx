import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BottomNavBar from '@navigation/BottomNavBar';
import { RootStackParamList } from '@navigation/types';

interface LayoutProps {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  style?: ViewStyle;
}

function Layout({ children, navigation, style }: LayoutProps) {
  const route = useRoute();
  // Pages où la NavBar ne doit pas apparaître
  const excludedRoutes = ['Login', 'Register, forgotPassword'];
  const shouldShowNavBar = !excludedRoutes.includes(route.name);

  return (
    <View style={[{ flex: 1 }, style]}>
      {children}
      {shouldShowNavBar && (
        <BottomNavBar navigation={navigation} currentRoute={route.name} />
      )}
    </View>
  );
}

export default Layout;
