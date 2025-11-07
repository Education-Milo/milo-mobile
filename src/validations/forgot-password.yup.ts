import * as yup from 'yup';
import i18n from '@i18n/index';

export interface ForgotPasswordFormData {
  email: string;
}

export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(i18n.t('validation.email.required'))
    .email(i18n.t('validation.email.invalid'))
    .trim(),
});
