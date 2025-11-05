import React from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { colors }from '@themes/colors';
import MainButton from '@components/MainButtonComponent';
import TypographyComponent from '@components/Typography.component';
import TextFieldComponent from '@components/TextField.component';
import { useLoginForm } from '@hook/useLoginForm';

export interface LoginFormProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  onLoginSuccess?: () => void;
  onLoadingChange: (loading: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

function LoginForm({ navigation, onLoginSuccess, onLoadingChange }: LoginFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    errors,
    handleLogin,
    goToForgotPassword,
  } = useLoginForm({ navigation, onLoginSuccess, onLoadingChange });

  return (
    <>
      <TypographyComponent
        variant='h3'
        style={{
          alignSelf: 'flex-start',
          marginLeft: 10,
          marginBottom: 15,
        }}
        color={colors.text.title}
      >
        Se connecter
      </TypographyComponent>
      <View style={localStyles.inputContainer}>
        <TextFieldComponent
          placeholder="Votre adresse email"
          icon={<Ionicons name='mail-outline' size={20} color='#666' />}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoComplete='email'
          autoCapitalize="none"
          editable={!isLoading}
          error={errors.email}
        />
      </View>

      <View style={localStyles.inputContainer}>
        <TextFieldComponent
          placeholder="Votre mot de passe"
          icon={<Ionicons name='lock-closed-outline' size={20} color='#666' />}
          value={password}
          onChangeText={text => setPassword(text)}
          type="password"
          autoComplete='password'
          editable={!isLoading}
          error={errors.password}
        />
        <TouchableOpacity
          disabled={isLoading}
          style={localStyles.forgotPasswordContainer}
          onPress={goToForgotPassword}
        >
          <TypographyComponent
            variant='bodySmall'
            style={{ color: '#FF8C00', textDecorationLine: 'underline' }}
          >
            Mot de passe oublié ?
          </TypographyComponent>
        </TouchableOpacity>
      </View>

      <MainButton
        onPress={handleLogin}
        loading={isLoading}
        title="Se connecter"
      />
    </>
  );
}

const localStyles = {
  inputContainer: {
      width: '100%' as const,
      marginBottom: 15,
    },
  forgotPasswordContainer: {
      alignItems: 'flex-end' as const,
      marginTop: 8,
    },
  }


export default LoginForm;
