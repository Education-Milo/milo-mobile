import React from 'react';
import { View, ViewStyle } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

function Layout({ children, style }: LayoutProps) {

  return (
    <View style={[{ flex: 1 }, style]}>
      {children}

    </View>
  );
}

export default Layout;
