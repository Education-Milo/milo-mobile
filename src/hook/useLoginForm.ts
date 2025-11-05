import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { useAuthStore } from '@store/auth/auth.store';

export interface UseLoginFormOptions {
  navigation?: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  onLoginSuccess?: () => void;
  onLoadingChange?: (loading: boolean) => void;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface UseLoginFormReturn {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  errors: LoginFormErrors;
  handleLogin: () => Promise<void>;
  goToForgotPassword: () => void;
}

export function useLoginForm(options: UseLoginFormOptions): UseLoginFormReturn {
  const { navigation, onLoginSuccess, onLoadingChange } = options;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const login = useAuthStore(state => state.login);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

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

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);
    onLoadingChange?.(true);
    try {
      await login(email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      // The error is logged in the caller/UI when needed
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  const goToForgotPassword = (): void => {
    navigation?.navigate('ForgotPassword');
  };

  return {
    email,
    setEmail: (value: string) => {
      setEmail(value);
      setErrors(prev => ({ ...prev, email: undefined }));
    },
    password,
    setPassword: (value: string) => {
      setPassword(value);
      setErrors(prev => ({ ...prev, password: undefined }));
    },
    isLoading,
    errors,
    handleLogin,
    goToForgotPassword,
  };
}

export default useLoginForm;


