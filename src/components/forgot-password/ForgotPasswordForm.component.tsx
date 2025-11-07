import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Typography from '@components/Typography.component';
import TextFieldComponent from '@components/TextField.component';
import MainButtonComponent from '@components/MainButton.component';
import { colors } from '@theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface FormErrors {
  email?: string;
}

interface ForgotPasswordFormProps {
  formData: {
    email: string;
  };
  errors: FormErrors;
  loading: boolean;
  isFieldFocused: boolean;
  onEmailChange: (text: string) => void;
  onSubmit: () => void;
  onFocus: () => void;
  onBlur: () => void;
  animations: {
    titleOpacity: Animated.Value;
    titleTranslateY: Animated.Value;
    emailOpacity: Animated.Value;
    emailTranslateY: Animated.Value;
    buttonOpacity: Animated.Value;
    buttonTranslateY: Animated.Value;
    buttonScale: Animated.Value;
    animateButtonPress: () => void;
  };
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  formData,
  errors,
  loading,
  isFieldFocused,
  onEmailChange,
  onSubmit,
  onFocus,
  onBlur,
  animations,
}) => {
  const { t } = useTranslation();

  const handleButtonPress = () => {
    animations.animateButtonPress();
    onSubmit();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: animations.titleOpacity,
            transform: [{ translateY: animations.titleTranslateY }],
          },
        ]}
      >
        <Typography variant='h2' color={colors.text.title}>
          {t('forgotPassword.title')}
        </Typography>
        <Typography variant='body'>
          {t('forgotPassword.description')}
        </Typography>
      </Animated.View>

      <Animated.View
        style={{
          opacity: animations.emailOpacity,
          transform: [{ translateY: animations.emailTranslateY }],
        }}
      >
        <TextFieldComponent
          placeholder={t('forgotPassword.email')}
          icon={<Ionicons name="mail-outline" size={20} color={colors.IconColor} />}
          type='email'
          returnKeyType='done'
          onSubmitEditing={handleButtonPress}
          onFocus={onFocus}
          onBlur={onBlur}
          importantForAutofill='yes'
          textContentType='emailAddress'
          autoCapitalize='none'
          autoComplete='email'
          value={formData.email}
          onChangeText={onEmailChange}
          error={errors.email}
        />
      </Animated.View>

      {isFieldFocused && (
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: animations.buttonOpacity,
              transform: [
                { translateY: animations.buttonTranslateY },
                { scale: animations.buttonScale },
              ],
            },
          ]}
        >
          <MainButtonComponent
            title={t('forgotPassword.button')}
            onPress={handleButtonPress}
            loading={loading}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  titleContainer: {
    gap: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ForgotPasswordForm;
