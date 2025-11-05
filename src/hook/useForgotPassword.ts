import { useState } from 'react';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { useAuthStore } from '@store/auth/auth.store';

export interface UseForgotPasswordOptions {
  navigation?: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
}

export interface UseForgotPasswordReturn {
  email: string;
  setEmail: (value: string) => void;
  isLoading: boolean;
  isSubmitted: boolean;
  emailError: string;
  handleSubmit: () => Promise<void>;
  handleGoBack: () => void;
}

export function useForgotPassword(options: UseForgotPasswordOptions = {}): UseForgotPasswordReturn {
  const { navigation } = options;

  const [email, setEmailState] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const forgotPassword = useAuthStore(state => state.forgotPassword);

  const validate = (): boolean => {
    if (!email.trim()) {
      setEmailError('Veuillez saisir votre adresse email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Veuillez saisir une adresse email valide');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (): Promise<void> => {

    if (!validate()) return;

    setIsLoading(true);
    try {
        forgotPassword(email);
        setIsSubmitted(true);
    } catch (error) {
        Alert.alert(
          'Erreur',
          "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard."
        );
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoBack = (): void => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return {
    email,
    setEmail: (value: string) => {
      setEmailState(value);
      if (emailError) setEmailError('');
    },
    isLoading,
    isSubmitted,
    emailError,
    handleSubmit,
    handleGoBack,
  };
}

export default useForgotPassword;


