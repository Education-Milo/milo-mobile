import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForgotPasswordForm } from '@hooks/useForgotPasswordForm';
import { useKeyboardState } from '@hooks/useKeyboardState';
import { useForgotPasswordAnimation } from '@hooks/useForgotPasswordAnimation';
import ForgotPasswordForm from '@components/forgot-password/ForgotPasswordForm.component';
import ForgotPasswordFooter from '@components/forgot-password/ForgotPasswordFooter.component';
import BackArrowIcon from '@assets/icons/login-icons/back-arrow.svg';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CONSTANTS = {
  PADDING_HORIZONTAL: 24,
  PADDING_BOTTOM: 16,
  FORM_GAP: 20,
  KEYBOARD_OFFSET: 50,
} as const;

const ForgotPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const { isFieldFocused, handleFocus, handleBlur, dismissKeyboard } =
    useKeyboardState();
  const { formData, errors, loading, handleEmailChange, handleForgotPassword } =
    useForgotPasswordForm();

  const {
    fadeAnim,
    slideAnim,
    formSlideAnim,
    backgroundOpacityAnim,
    footerOpacityAnim,
    titleOpacity,
    titleTranslateY,
    emailOpacity,
    emailTranslateY,
    buttonOpacity,
    buttonTranslateY,
    buttonScale,
    animateButtonPress,
  } = useForgotPasswordAnimation(isFieldFocused);

  const navigation = useNavigation();

  const containerStyle = [
    styles.container,
    {
      paddingBottom: insets.bottom,
      opacity: fadeAnim,
      transform: [{ translateY: slideAnim }],
    },
  ];

  const headerStyle = [styles.header, { flex: isFieldFocused ? 0 : 1 }];

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
            {!isFieldFocused && (
              <Animated.View
                style={[headerStyle, { paddingTop: insets.top }]}
                pointerEvents='box-none'
                >
                <View style={styles.headerContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons name="arrow-back-outline" size={28} color="black" />
                  </TouchableOpacity>
                  <Image
                    source={require('@assets/images/logo_sans_fond.png')}
                    style={styles.logoWrapper}
                  />
                </View>
              </Animated.View>
            )}

            <Animated.View style={contentStyle} pointerEvents='box-none'>
              <ForgotPasswordForm
                formData={formData}
                errors={errors}
                loading={loading}
                isFieldFocused={isFieldFocused}
                onEmailChange={handleEmailChange}
                onSubmit={handleForgotPassword}
                onFocus={handleFocus}
                onBlur={handleBlur}
                animations={{
                  titleOpacity,
                  titleTranslateY,
                  emailOpacity,
                  emailTranslateY,
                  buttonOpacity,
                  buttonTranslateY,
                  buttonScale,
                  animateButtonPress,
                }}
              />

              <Animated.View style={{ opacity: footerOpacityAnim }}>
                <ForgotPasswordFooter
                  loading={loading}
                  isFieldFocused={isFieldFocused}
                  onForgetPassword={handleForgotPassword}
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    left: 24,
    zIndex: 1,
  },
  content: {
    paddingHorizontal: CONSTANTS.PADDING_HORIZONTAL,
    justifyContent: 'space-between',
    paddingBottom: CONSTANTS.PADDING_BOTTOM,
    flex: 5,
  },
  logoWrapper: {
    width: 120,                 // ajuste selon ton logo
    height: 50,
  },
});

export default ForgotPasswordScreen;
