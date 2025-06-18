import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { colors }from '@themes/colors';
import styles from '@constants/Colors';
import MainButton from '@components/MainButtonComponent';
import TypographyComponent from '@components/Typography.component';
import TextFieldComponent from '@components/TextField.component';

export interface LoginFormProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  onLoginSuccess?: () => void;
  onLoadingChange: (loading: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

function LoginForm({ navigation, onLoginSuccess, onLoadingChange }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    onLoadingChange?.(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      navigation.navigate('Home');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <>
      <TypographyComponent
        variant='h3'
        style={{
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          marginLeft: 10,
          marginBottom: 15,
        }}
        color={colors.text.title}
      >
        Se connecter
      </TypographyComponent>
      <View style={styles.inputContainer}>
        <TextFieldComponent
          placeholder="Votre adresse email"
          icon={<Ionicons name='mail-outline' size={20} color='#666' />}
          value={email}
          onChangeText={text => {
            setEmail(text);
            setErrors(prev => ({ ...prev, email: undefined }));
          }}
          keyboardType="email-address"
          autoComplete='email'
          autoCapitalize="none"
          editable={!isLoading}
          error={errors.email}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextFieldComponent
          placeholder="Votre mot de passe"
          icon={<Ionicons name='lock-closed-outline' size={20} color='#666' />}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setErrors(prev => ({ ...prev, password: undefined }));
          }}
          type="password"
          autoComplete='password'
          editable={!isLoading}
          error={errors.password}
        />
        <TouchableOpacity
          disabled={isLoading}
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('ForgotPassword')}
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

export default LoginForm;
