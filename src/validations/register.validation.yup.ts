import * as yup from 'yup';
import i18n from '@i18n/index';

export const registerValidationSchema = yup.object({
  prenom: yup
    .string()
    .trim()
    .required(i18n.t('validation.prenom.required')),
  nom: yup
    .string()
    .trim()
    .required(i18n.t('validation.nom.required')),
  email: yup
    .string()
    .trim()
    .required(i18n.t('validation.email.required'))
    .email(i18n.t('validation.email.invalid')),
  password: yup
    .string()
    .trim()
    .required(i18n.t('validation.password.required'))
    .test(
      'complexity',
      i18n.t('validation.password.complexity'),
      function (value) {
        if (!value) {
          return true; // Let required handle empty case
        }
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(
          value
        );
      }
    )
    .test(
      'minLength',
      i18n.t('validation.password.minLength'),
      function (value) {
        if (!value) {
          return true; // Let required handle empty case
        }
        return value.length >= 8;
      }
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required(i18n.t('validation.confirmPassword.required'))
    .test(
      'passwords-match',
      i18n.t('validation.confirmPassword.match'),
      function (value) {
        // Only check match if both passwords exist
        if (!value || !this.parent.password) {
          return true; // Let required handle empty case
        }
        return value === this.parent.password;
      }
    ),
    role: yup
    .string()
    .oneOf(['Élève', 'Parent', 'Prof'], i18n.t('validation.role.invalid'))
    .required(i18n.t('validation.role.required')),
});

export type RegisterFormData = yup.InferType<typeof registerValidationSchema>;
