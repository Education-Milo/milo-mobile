import * as yup from 'yup';
import i18n from '@i18n/index';

export const registerValidationSchema = yup.object({
  first_name: yup
    .string()
    .trim()
    .required(i18n.t('validation.prenom.required')),
  last_name: yup
    .string()
    .trim()
    .required(i18n.t('validation.nom.required')),
  username: yup
    .string()
    .trim()
    .required(i18n.t('validation.username.required')),
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
          return true;
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
          return true;
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
        if (!value || !this.parent.password) {
          return true;
        }
        return value === this.parent.password;
      }
    ),
    role: yup
    .string()
    .oneOf(['Enfant', 'Parent', 'Professeur'], i18n.t('validation.role.invalid'))
    .required(i18n.t('validation.role.required')),
    classe: yup
    .string()
    .oneOf(['6eme', '5eme', '4eme', '3eme'], i18n.t('validation.classe.invalid'))
    .required(i18n.t('validation.classe.required')),
});

export type RegisterFormData = yup.InferType<typeof registerValidationSchema>;
