import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useLoginAnimations = (isFieldFocused: boolean) => {
  // Global animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoOpacityAnim = useRef(new Animated.Value(1)).current;
  const formSlideAnim = useRef(new Animated.Value(0)).current;
  const backgroundOpacityAnim = useRef(new Animated.Value(1)).current;
  const footerOpacityAnim = useRef(new Animated.Value(1)).current;

  // Form animations
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const emailOpacity = useRef(new Animated.Value(0)).current;
  const emailTranslateY = useRef(new Animated.Value(20)).current;
  const passwordOpacity = useRef(new Animated.Value(0)).current;
  const passwordTranslateY = useRef(new Animated.Value(20)).current;
  const forgotPasswordOpacity = useRef(new Animated.Value(0)).current;
  const forgotPasswordTranslateY = useRef(new Animated.Value(20)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Initial entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 200,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        delay: 400,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Form entrance animations
    const duration = 600;
    const staggerDelay = 100;

    Animated.stagger(staggerDelay, [
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(emailOpacity, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(emailTranslateY, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(passwordOpacity, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(passwordTranslateY, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(forgotPasswordOpacity, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(forgotPasswordTranslateY, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // Keyboard state animations
  useEffect(() => {
    const duration = 600;
    const easing = Easing.bezier(0.25, 0.46, 0.45, 0.94);

    if (isFieldFocused) {
      // When keyboard appears
      Animated.parallel([
        Animated.timing(logoOpacityAnim, {
          toValue: 0,
          duration: 300,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(formSlideAnim, {
          toValue: -20,
          duration,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacityAnim, {
          toValue: 0.3,
          duration,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(footerOpacityAnim, {
          toValue: 0,
          duration: 300,
          easing,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // When keyboard disappears
      Animated.parallel([
        Animated.timing(logoOpacityAnim, {
          toValue: 1,
          duration: 400,
          delay: 100,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(formSlideAnim, {
          toValue: 0,
          duration,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacityAnim, {
          toValue: 1,
          duration,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(footerOpacityAnim, {
          toValue: 1,
          duration: 400,
          delay: 200,
          easing,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFieldFocused]);

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    // Global animations
    fadeAnim,
    slideAnim,
    logoScaleAnim,
    logoOpacityAnim,
    formSlideAnim,
    backgroundOpacityAnim,
    footerOpacityAnim,

    // Form animations
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

    // Animation functions
    animateButtonPress,
  };
};
