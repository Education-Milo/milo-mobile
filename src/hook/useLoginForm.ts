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
  general?: string;
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

    if (!email || !email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<void> => {
    setErrors(prev => ({ ...prev, general: undefined }));

    if (!validateForm()) return;

    setIsLoading(true);
    onLoadingChange?.(true);
    try {
      await login(email.trim(), password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Email ou mot de passe incorrect';

      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.detail;

        switch (status) {
          case 401:
            errorMessage = 'Email ou mot de passe incorrect';
            break;
          case 403:
            errorMessage = 'Compte désactivé. Contactez le support.';
            break;
          case 429:
            errorMessage = 'Trop de tentatives. Réessayez plus tard.';
            break;
          case 500:
            errorMessage = 'Erreur serveur. Réessayez plus tard.';
            break;
          default:
            if (message === 'EMAIL_NOT_VERIFIED') {
              errorMessage = 'Veuillez vérifier votre email avant de vous connecter.';
            } else if (message) {
              errorMessage = message;
            }
        }
      } else if (error.message === 'Network Error' || !error.response) {
        errorMessage = 'Pas de connexion internet. Vérifiez votre réseau.';
      }

      setErrors({
        general: errorMessage,
      });
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
      setErrors(prev => ({ ...prev, email: undefined, general: undefined }));
    },
    password,
    setPassword: (value: string) => {
      setPassword(value);
      setErrors(prev => ({ ...prev, password: undefined, general: undefined }));
    },
    isLoading,
    errors,
    handleLogin,
    goToForgotPassword,
  };
}

export default useLoginForm;


