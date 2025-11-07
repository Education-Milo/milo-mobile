import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';
import { RootStackParamList } from '@navigation/HoldVersion/types';
import { View, Text } from 'react-native';
import styles from '@navigation/constants/Colors';
import React from 'react';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface GameScreenProps {
  navigation: NavigationProp;
}

function GameScreen({ navigation }: GameScreenProps) {
  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Screen</Text>
        <Text style={styles.subtitle}>This is the game screen content.</Text>
      </View>
    </Layout>
  );
}

export default GameScreen;
