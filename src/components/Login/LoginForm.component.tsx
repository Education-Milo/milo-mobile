import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Typography from '@components/Typography.component';
import TextFieldComponent from '@components/TextField.component';
import MainButtonComponent from '@components/MainButton.component';
import { colors } from '@theme/colors';
import { UnAuthScreenNames } from '@navigation/UnAuth/unAuthNavigator.model';
import { Ionicons } from '@expo/vector-icons';
import type { UnAuthStackParamList } from '@navigation/UnAuth/unAuthNavigator.model';
import type { LoginFormData } from 'src/validations/login.validation.yup';
import { useTranslation } from 'react-i18next';

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  formData: LoginFormData;
  errors: FormErrors;
  loading: boolean;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
  onFocus: () => void;
  onBlur: () => void;
  animations: {
    titleOpacity: Animated.Value;
    titleTranslateY: Animated.Value;
    emailOpacity: Animated.Value;
    emailTranslateY: Animated.Value;
    passwordOpacity: Animated.Value;
    passwordTranslateY: Animated.Value;
    forgotPasswordOpacity: Animated.Value;
    forgotPasswordTranslateY: Animated.Value;
    buttonOpacity: Animated.Value;
    buttonTranslateY: Animated.Value;
    buttonScale: Animated.Value;
    animateButtonPress: () => void;
  };
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  errors,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onFocus,
  onBlur,
  animations,
}) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<UnAuthStackParamList>>();
  const passwordRef = useRef<TextInput>(null);

  const navigateToForgotPassword = () => {
    navigation.navigate(UnAuthScreenNames.ForgotPassword);
  };

  const handleButtonPress = () => {
    animations.animateButtonPress();
    onSubmit();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: animations.titleOpacity,
          transform: [{ translateY: animations.titleTranslateY }],
        }}
      >
        <Typography variant='h2' color={colors.text.title}>
          {t('login.title')}
        </Typography>
      </Animated.View>

      <Animated.View
        style={{
          opacity: animations.emailOpacity,
          transform: [{ translateY: animations.emailTranslateY }],
        }}
      >
        <TextFieldComponent
          placeholder={t('login.email')}
          icon={<Ionicons name='mail-outline' size={20} color='#666' />}
          type='email'
          returnKeyType='next'
          onSubmitEditing={() => passwordRef.current?.focus()}
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

      <Animated.View
        style={{
          opacity: animations.passwordOpacity,
          transform: [{ translateY: animations.passwordTranslateY }],
        }}
      >
        <TextFieldComponent
          ref={passwordRef}
          placeholder={t('login.password')}
          icon={<Ionicons name='lock-closed-outline' size={20} color='#666' />}
          type='password'
          returnKeyType='done'
          onSubmitEditing={handleButtonPress}
          onFocus={onFocus}
          onBlur={onBlur}
          importantForAutofill='yes'
          textContentType='password'
          autoComplete='password'
          autoCapitalize='none'
          value={formData.password}
          onChangeText={onPasswordChange}
          error={errors.password}
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: animations.forgotPasswordOpacity,
          transform: [{ translateY: animations.forgotPasswordTranslateY }],
        }}
      >
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={navigateToForgotPassword}
          disabled={loading}
        >
          <Typography
            variant='bodyLarge'
            color={colors.buttonText}
            style={styles.forgotPasswordText}
          >
            {t('login.forgotPassword')}
          </Typography>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          opacity: animations.buttonOpacity,
          transform: [
            { translateY: animations.buttonTranslateY },
            { scale: animations.buttonScale },
          ],
        }}
      >
        <MainButtonComponent
          title={t('login.title')}
          onPress={handleButtonPress}
          loading={loading}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
