import { useCallback, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UnAuthStackParamList } from '@navigation/UnAuth/unAuthNavigator.model';
import { useAuthStore } from '@store/auth/auth.store';
import { useNavigation } from '@react-navigation/native';
import { getSuccessMessageDescription, getSuccessMessageTitle } from '@utils/Toast';
import * as yup from 'yup';
import * as Haptics from 'expo-haptics';
import { forgotPasswordValidationSchema, ForgotPasswordFormData } from '@validations/forgot-password.yup';
import { showMessage } from 'react-native-flash-message';

interface FormErros {
  email?: string;
}

export const useForgotPasswordForm = () => {

  const { forgotPassword, loading } = useAuthStore();
  const navigation = useNavigation();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });
  const [errors, setErrors] = useState<FormErros>({});

  const validateForm = useCallback (async (): Promise<boolean> => {
    try {
      await forgotPasswordValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: FormErros = {};
        error.inner.forEach(err => {
          if (err.path && err.path === 'email') {
            newErrors[err.path] = err.message;
          }
        });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleEmailChange = (text: string) => {
    setFormData(prev => ({ ...prev, email: text }));
  };

  const handleForgotPassword = useCallback (async () => {
    const isValid = await validateForm();
    if (isValid) {
      await forgotPassword(formData.email);
      Keyboard.dismiss();
      navigation.goBack();
      showMessage({
        message: getSuccessMessageTitle('forgotPassword.successTitle'),
        description: getSuccessMessageDescription('forgotPassword.successMessage'),
        type: 'success',
      });
    }
  }, [validateForm, forgotPassword, navigation]);

  return {
    formData,
    loading,
    errors,
    handleForgotPassword,
    handleEmailChange
  };
}

export default useForgotPasswordForm;


