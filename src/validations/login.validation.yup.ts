import * as yup from 'yup';
import i18n from '@i18n/index';

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required(i18n.t('validation.email.required'))
    .email(i18n.t('validation.email.invalid'))
    .trim(),
  password: yup.string().required(i18n.t('validation.password.required')).trim(),
});

export type LoginFormData = yup.InferType<typeof loginValidationSchema>;
