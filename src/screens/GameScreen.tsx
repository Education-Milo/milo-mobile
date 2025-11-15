import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import styles from '@navigation/constants/Colors';
import React from 'react';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { useNavigation } from '@react-navigation/native';

type GameScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;


const GameScreen = ()  =>{
  const navigation = useNavigation<GameScreenNavigationProp>();
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Game Screen</Text>
        <Text style={styles.subtitle}>This is the game screen content.</Text>
      </View>
  );
}

export default GameScreen;
