import { useState } from 'react';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { useAuthStore } from '@store/auth/auth.store';

export interface UseRegisterFormOptions {
  navigation?: NativeStackNavigationProp<RootStackParamList, 'Register'>;
}

export interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

export interface RoleOption {
  key: string;
  label: string;
}

export interface UseRegisterFormReturn {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  roles: RoleOption[];
  errors: RegisterFormErrors;
  isLoading: boolean; // local loading
  isSubmitting: boolean; // local || store loading
  handleRegister: () => Promise<void>;
  goToLogin: () => void;
}

export function useRegisterForm(options: UseRegisterFormOptions = {}): UseRegisterFormReturn {
  const { navigation } = options;

  const [firstName, setFirstNameState] = useState('');
  const [lastName, setLastNameState] = useState('');
  const [email, setEmailState] = useState('');
  const [password, setPasswordState] = useState('');
  const [confirmPassword, setConfirmPasswordState] = useState('');
  const [role, setRoleState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const { register, loading } = useAuthStore();

  const roles: RoleOption[] = [
    { key: 'Eleve', label: 'Élève' },
    { key: 'Parent', label: 'Parent' },
    { key: 'Prof', label: 'Professeur' },
  ];

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!role) {
      newErrors.role = 'Veuillez sélectionner un rôle';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(email, password, lastName, firstName, role);
      Alert.alert(
        'Inscription réussie',
        'Votre compte a été créé avec succès !',
        [{ text: 'OK', onPress: () => navigation?.navigate('Login') }]
      );
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      let errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      Alert.alert('Erreur', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = (): void => {
    navigation?.navigate('Login');
  };

  return {
    firstName,
    setFirstName: (value: string) => {
      setFirstNameState(value);
      setErrors(prev => ({ ...prev, firstName: undefined }));
    },
    lastName,
    setLastName: (value: string) => {
      setLastNameState(value);
      setErrors(prev => ({ ...prev, lastName: undefined }));
    },
    email,
    setEmail: (value: string) => {
      setEmailState(value);
      setErrors(prev => ({ ...prev, email: undefined }));
    },
    password,
    setPassword: (value: string) => {
      setPasswordState(value);
      setErrors(prev => ({ ...prev, password: undefined }));
    },
    confirmPassword,
    setConfirmPassword: (value: string) => {
      setConfirmPasswordState(value);
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    },
    role,
    setRole: (value: string) => {
      setRoleState(value);
      setErrors(prev => ({ ...prev, role: undefined }));
    },
    roles,
    errors,
    isLoading,
    isSubmitting: isLoading || !!loading,
    handleRegister,
    goToLogin,
  };
}

export default useRegisterForm;


