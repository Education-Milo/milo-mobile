import i18n from '@i18n/index';


export enum ErrorMessage {
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE',
    NOT_FOUND = 'NOT_FOUND',
    CONFLICT = 'CONFLICT',
    UNIQUE_CONSTRAINT = 'UNIQUE_CONSTRAINT',
    ERROR_GENERATING_TOKEN = 'ERROR_GENERATING_TOKEN',
    MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
    ONBOARDING_ALREADY_COMPLETED = 'ONBOARDING_ALREADY_COMPLETED',
    NOT_MATCHED_TOKEN = 'NOT_MATCHED_TOKEN',
  }

  export enum SuccessMessage {
    RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  }

export const getSuccessMessageTitle = (success: string) => {
    switch (success) {
      case SuccessMessage.RESET_PASSWORD_SUCCESS:
        return i18n.t('success.resetPassword.title');
      default:
        return i18n.t('success.default.title');
    }
  };

  export const getSuccessMessageDescription = (success: string) => {
    switch (success) {
      case SuccessMessage.RESET_PASSWORD_SUCCESS:
        return i18n.t('success.resetPassword.description');
      default:
        return i18n.t('success.default.description');
    }
  };