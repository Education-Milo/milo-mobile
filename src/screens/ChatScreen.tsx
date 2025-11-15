import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';
import { View, Text } from 'react-native';
import styles from '@navigation/constants/Colors';
import { RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';


type ChatScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;


const ChatScreen = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Screen</Text>
      <Text style={styles.subtitle}>This is the game screen content.</Text>
    </View>
  );
}

export default ChatScreen;
