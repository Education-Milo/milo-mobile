import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import styles from '@constants/Colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginFooterProps {
  navigation: NavigationProp;
  isLoading: boolean;
}

function LoginFooter({ navigation, isLoading }: LoginFooterProps) {
  return (
    <>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OU</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Pas de compte ?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          disabled={isLoading}
        >
          <Text style={styles.signupLink}>Inscrivez-vous</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LoginFooter;
