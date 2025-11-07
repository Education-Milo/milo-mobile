import React, { useRef, useEffect } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import MainButtonComponent from '@components/MainButton.component';
import Typography from '@components/Typography.component';
// import PrivacyPolicies from '@components/PrivacyPolicies.component';

interface RegisterFooterProps {
  loading: boolean;
  isFieldFocused: boolean;
  onRegister: () => void;
}

const RegisterFooter: React.FC<RegisterFooterProps> = ({
  loading,
  isFieldFocused,
  onRegister,
}) => {
  const { t } = useTranslation();

  // Animation values
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const linkOpacity = useRef(new Animated.Value(0)).current;
  const linkTranslateY = useRef(new Animated.Value(30)).current;
  const linkScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isFieldFocused) {
      Animated.stagger(200, [
        Animated.parallel([
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 600,
            delay: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(buttonTranslateY, {
            toValue: 0,
            duration: 600,
            delay: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(linkOpacity, {
            toValue: 1,
            duration: 600,
            delay: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(linkTranslateY, {
            toValue: 0,
            duration: 600,
            delay: 300,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, []);

  // Animation based on field focus state
  useEffect(() => {
    if (!isFieldFocused) {
      // Animate appearance when no field is focused
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(linkOpacity, {
          toValue: 1,
          duration: 600,
          delay: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(linkTranslateY, {
          toValue: 0,
          duration: 600,
          delay: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Disappear instantly when a field is focused
      buttonOpacity.setValue(0);
      buttonTranslateY.setValue(20);
      linkOpacity.setValue(0);
      linkTranslateY.setValue(30);
    }
  }, [isFieldFocused]);

  const handleRegisterPress = () => {
    // Button press animation
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

    onRegister();
  };

  if (isFieldFocused) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: linkOpacity,
          transform: [{ translateY: linkTranslateY }, { scale: linkScale }],
        }}
      >
        <Typography variant='bodySmall' style={{ textAlign: 'center', color: '#666' }}>
          {t('register.byRegisteringYouAgree')}
        </Typography>
        {/* <PrivacyPolicies /> */}
      </Animated.View>
      <Animated.View
        style={{
          opacity: buttonOpacity,
          transform: [{ translateY: buttonTranslateY }, { scale: buttonScale }],
        }}
      >
        <MainButtonComponent
          title={t('register.button')}
          onPress={handleRegisterPress}
          loading={loading}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    gap: 15,
  },
});

export default RegisterFooter;
