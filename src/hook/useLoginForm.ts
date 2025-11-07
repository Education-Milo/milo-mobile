import { useCallback, useState } from 'react';
import { useAuthStore } from '@store/auth/auth.store';
import { useUserStore } from '@store/user/user.store';
import * as yup from 'yup';
import * as Haptics from 'expo-haptics';
import { loginValidationSchema, LoginFormData } from 'src/validations/login.validation.yup';

interface FormErrors {
  email?: string;
  password?: string;
}

export const useLoginForm = ()  =>{
  const { login, loading } = useAuthStore();
  const { getMe }  = useUserStore();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});


  const validateForm = useCallback(async (): Promise<boolean> => {
    try {
      await loginValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        error.inner.forEach(err => {
          if (err.path && (err.path === 'email' || err.path === 'password')) {
            newErrors[err.path] = err.message;
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
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setFormData(prev => ({ ...prev, password: text }));
  }, []);

  const handleLogin = useCallback(async () => {
    const isValid = await validateForm();
    if (isValid) {
      await login(formData.email.trim(), formData.password);
      await getMe();
    }
  }, [formData, login, validateForm, getMe]);

  return {
    formData,
    loading,
    errors,
    handleLogin,
    handleEmailChange,
    handlePasswordChange,
  };
}

export default useLoginForm;




  // const validateForm = (): boolean => {
  //   const newErrors: LoginFormErrors = {};

  //   if (!email || !email.trim()) {
  //     newErrors.email = "L'email est requis";
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = "Format d'email invalide";
  //   }

  //   if (!password) {
  //     newErrors.password = 'Le mot de passe est requis';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleLogin = async (): Promise<void> => {
  //   setErrors(prev => ({ ...prev, general: undefined }));

  //   if (!validateForm()) return;

  //   setIsLoading(true);
  //   onLoadingChange?.(true);
  //   try {
  //     await login(email.trim(), password);
  //     if (onLoginSuccess) {
  //       onLoginSuccess();
  //     }
  //   } catch (error: any) {
  //     console.error('Login error:', error);
  //     let errorMessage = 'Email ou mot de passe incorrect';

  //     if (error.response) {
  //       const status = error.response.status;
  //       const message = error.response.data?.message || error.response.data?.detail;

  //       switch (status) {
  //         case 401:
  //           errorMessage = 'Email ou mot de passe incorrect';
  //           break;
  //         case 403:
  //           errorMessage = 'Compte désactivé. Contactez le support.';
  //           break;
  //         case 429:
  //           errorMessage = 'Trop de tentatives. Réessayez plus tard.';
  //           break;
  //         case 500:
  //           errorMessage = 'Erreur serveur. Réessayez plus tard.';
  //           break;
  //         default:
  //           if (message === 'EMAIL_NOT_VERIFIED') {
  //             errorMessage = 'Veuillez vérifier votre email avant de vous connecter.';
  //           } else if (message) {
  //             errorMessage = message;
  //           }
  //       }
  //     } else if (error.message === 'Network Error' || !error.response) {
  //       errorMessage = 'Pas de connexion internet. Vérifiez votre réseau.';
  //     }

  //     setErrors({
  //       general: errorMessage,
  //     });
  //   } finally {
  //     setIsLoading(false);
  //     onLoadingChange?.(false);
  //   }
  // };

  // const goToForgotPassword = (): void => {
  //   navigation?.navigate('ForgotPassword');
  // };