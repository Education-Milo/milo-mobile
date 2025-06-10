import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '@constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '@navigation/types';
import LoginForm from '@components/Login/LoginForm';
import LoginFooter from '@components/Login/LoginFooter';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: NavigationProp;
  onLoginSuccess?: () => void;
}

function LoginScreen({ navigation, onLoginSuccess }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      // enableAutomaticScroll={true}
      // extraScrollHeight={20} // Espace supplémentaire au-dessus du champ
      // keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Image
          source={require('@assets/images/logo_sans_fond.png')}
          style={styles.logo}
          />
        <LoginForm
          navigation={navigation}
          onLoginSuccess={onLoginSuccess}
          onLoadingChange={setIsLoading}
          />
        <LoginFooter
          navigation={navigation}
          isLoading={isLoading}
          />
        <StatusBar style='auto' />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default LoginScreen;
