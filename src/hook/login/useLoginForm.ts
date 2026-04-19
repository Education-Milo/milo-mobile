import { useCallback, useState } from "react";
import { useAuthStore } from "@store/auth/auth.store";
import { useUserStore } from "@store/user/user.store";
import * as yup from "yup";
import * as Haptics from "expo-haptics";
import {
	loginValidationSchema,
	LoginFormData,
} from "src/validations/login.validation.yup";
import i18n from "@i18n/index";

interface FormErrors {
	email?: string;
	password?: string;
}

export const useLoginForm = () => {
	const { login, loading } = useAuthStore();
	const { getMe } = useUserStore();
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

	const validateForm = useCallback(async (): Promise<boolean> => {
		try {
			await loginValidationSchema.validate(formData, { abortEarly: false });
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				const newErrors: FormErrors = {};
				error.inner.forEach((err) => {
					if (err.path && (err.path === "email" || err.path === "password")) {
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
		setFormData((prev) => ({ ...prev, email: text }));
	}, []);

	const handlePasswordChange = useCallback((text: string) => {
		setFormData((prev) => ({ ...prev, password: text }));
	}, []);

	const handleLogin = useCallback(async () => {
		const isValid = await validateForm();
    if (!isValid) return;
		try {
      setGeneralError(null);
			await login(formData.email.trim(), formData.password);
			await getMe();
		} catch (error: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      const status = error?.response?.status;
      if (status === 401) {
        setGeneralError(i18n.t('login.errors.invalidCredentials'));
      } else if (status === 403) {
        setGeneralError(i18n.t('login.errors.accountDisabled'));
      } else if (!error.response) {
        setGeneralError(i18n.t('login.errors.networkError'));
      } else {
        setGeneralError(i18n.t('login.errors.default'));
      }
		}
	}, [formData, login, validateForm, getMe]);

	return {
		formData,
		loading,
		errors,
		handleLogin,
		handleEmailChange,
		handlePasswordChange,
    generalError,
	};
};

export default useLoginForm;
