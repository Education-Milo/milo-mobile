import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066CC" />
        <TypographyComponent variant="h4" style={styles.text} color={colors.text.title}>
            Chargement en cours...
        </TypographyComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F1',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
});