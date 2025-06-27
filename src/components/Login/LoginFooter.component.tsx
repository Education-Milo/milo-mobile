import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import styles from '@constants/Colors';
import TypographyComponent from '@components/Typography.component';

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
        <TypographyComponent variant="bodySmall" style={styles.dividerText}>
          OU
        </TypographyComponent>
        <View style={styles.dividerLine} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        disabled={isLoading}
        style={styles.signupContainer}
      >
      <TypographyComponent variant="bodySmall">
        Vous n'avez pas de compte ?
      </TypographyComponent>
        <TypographyComponent variant="body" style={{ color: '#FF8C00', textDecorationLine: 'underline'}}>
          Inscrivez-vous
        </TypographyComponent>
      </TouchableOpacity>
    </>
  );
}

export default LoginFooter;
