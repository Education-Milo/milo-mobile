import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLoginForm } from '@hooks/useLoginForm';
import { useKeyboardState } from '@hooks/useKeyboardState';
import { useLoginAnimations } from '@hooks/useLoginAnimations';
import LoginForm from '@components/Login/LoginForm.component';
import LoginFooter from '@components/Login/LoginFooter.component';

const CONSTANTS = {
  LOGO_SIZE: 100,
  PADDING_HORIZONTAL: 24,
  PADDING_BOTTOM: 16,
  FORM_GAP: 20,
  KEYBOARD_OFFSET: 50,
} as const;

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const { isFieldFocused, handleFocus, handleBlur, dismissKeyboard } =
    useKeyboardState();
  const {
    formData,
    errors,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLoginForm();

  const {
    fadeAnim,
    slideAnim,
    logoScaleAnim,
    logoOpacityAnim,
    formSlideAnim,
    backgroundOpacityAnim,
    footerOpacityAnim,
    titleOpacity,
    titleTranslateY,
    emailOpacity,
    emailTranslateY,
    passwordOpacity,
    passwordTranslateY,
    forgotPasswordOpacity,
    forgotPasswordTranslateY,
    buttonOpacity,
    buttonTranslateY,
    buttonScale,
    animateButtonPress,
  } = useLoginAnimations(isFieldFocused);

  const containerStyle = [
    styles.container,
    {
      paddingBottom: insets.bottom,
      opacity: fadeAnim,
      transform: [{ translateY: slideAnim }],
    },
  ];

  const headerStyle = [styles.header, { flex: isFieldFocused ? 0 : 2 }];

  const contentStyle = [
    styles.content,
    {
      paddingTop: isFieldFocused ? insets.top + CONSTANTS.KEYBOARD_OFFSET : 0,
      transform: [{ translateY: formSlideAnim }],
    },
  ];

  return (
    <View style={styles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.wrapper}>
          <Animated.View
            style={[
              styles.backgroundWrapper,
              { opacity: backgroundOpacityAnim },
            ]}
          >
          </Animated.View>

          <Animated.View style={containerStyle} pointerEvents='box-none'>
            <Animated.View style={headerStyle} pointerEvents='box-none'>
              {!isFieldFocused && (
                <Animated.Image
                  source={require('@assets/images/logo_sans_fond.png')}
                  resizeMode='contain'
                  style={[
                    styles.logo,
                    {
                      opacity: logoOpacityAnim,
                      transform: [{ scale: logoScaleAnim }],
                    },
                  ]}
                />
              )}
            </Animated.View>

            <Animated.View style={contentStyle} pointerEvents='box-none'>
              <LoginForm
                formData={formData}
                errors={errors}
                loading={loading}
                onEmailChange={handleEmailChange}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleLogin}
                onFocus={handleFocus}
                onBlur={handleBlur}
                animations={{
                  titleOpacity,
                  titleTranslateY,
                  emailOpacity,
                  emailTranslateY,
                  passwordOpacity,
                  passwordTranslateY,
                  forgotPasswordOpacity,
                  forgotPasswordTranslateY,
                  buttonOpacity,
                  buttonTranslateY,
                  buttonScale,
                  animateButtonPress,
                }}
              />

              <Animated.View style={{ opacity: footerOpacityAnim }}>
                <LoginFooter
                  loading={loading}
                  isFieldFocused={isFieldFocused}
                />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: CONSTANTS.PADDING_HORIZONTAL,
    justifyContent: 'space-between',
    paddingBottom: CONSTANTS.PADDING_BOTTOM,
    flex: 3,
  },
  logo: {
    width: CONSTANTS.LOGO_SIZE,
    height: CONSTANTS.LOGO_SIZE,
  },
});

export default LoginScreen;
