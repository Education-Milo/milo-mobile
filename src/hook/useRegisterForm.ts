import { useState, useCallback } from 'react';
import * as yup from 'yup';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '@store/auth/auth.store';
import {
  registerValidationSchema,
  type RegisterFormData,
} from '@validations/register.validation.yup';
import {
  UnAuthScreenNames,
  type UnAuthStackParamList,
} from '@navigation/UnAuth/unAuthNavigator.model';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Keyboard } from 'react-native';

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nom?: string;
  prenom?: string;
  role?: string;
}

export const useRegisterForm = () => {
  const { loading, register } = useAuthStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<UnAuthStackParamList>>();
  const [formData, setFormData] = useState<RegisterFormData>({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Élève',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback(async (): Promise<boolean> => {
    try {
      await registerValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        error.inner.forEach(err => {
          if (
            err.path &&
            (err.path === 'email' ||
              err.path === 'password' ||
              err.path === 'confirmPassword' ||
              err.path === 'prenom' ||
              err.path === 'nom' ||
              err.path === 'role')
          ) {
            newErrors[err.path as keyof FormErrors] = err.message;
          }
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleEmailChange = useCallback((text: string) => {
    setFormData(prev => ({ ...prev, email: text }));
    setErrors(prev => ({ ...prev, email: undefined }));
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setFormData(prev => ({ ...prev, password: text }));
    setErrors(prev => ({ ...prev, password: undefined }));
  }, []);

  const handleConfirmPasswordChange = useCallback((text: string) => {
    setFormData(prev => ({ ...prev, confirmPassword: text }));
    setErrors(prev => ({ ...prev, confirmPassword: undefined }));
  }, []);

  const handleNomChange = useCallback((text: string) => {
    setFormData(prev => ({ ...prev, nom: text }));
    setErrors(prev => ({ ...prev, nom: undefined }));
  }, []);

  const handlePrenomChange = useCallback((text: string) => {
    setFormData(prev => ({ ...prev, prenom: text }));
    setErrors(prev => ({ ...prev, prenom: undefined }));
  }, []);

  const handleRoleChange = useCallback((newRole: RegisterFormData['role']) => {
    setFormData(prev => ({ ...prev, role: newRole }));
    setErrors(prev => ({ ...prev, role: undefined }));
  }, []);


  const handleRegister = useCallback(async () => {
    const isValid = await validateForm();
    if (isValid) {
      await register(formData.email, formData.password, formData.nom, formData.prenom, formData.role);
      Keyboard.dismiss();
    }
  }, [validateForm, register, formData.email, formData.nom, formData.password, formData.prenom, formData.role, navigation]);

  return {
    formData,
    errors,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleNomChange,
    handleRoleChange,
    handlePrenomChange,
    handleRegister,
  };
};
