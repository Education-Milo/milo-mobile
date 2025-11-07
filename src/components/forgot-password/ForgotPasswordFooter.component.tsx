import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Typography from '@components/Typography.component';
import { colors } from '@theme/colors';
import { UnAuthScreenNames } from '@navigation/UnAuth/unAuthNavigator.model';
import type { UnAuthStackParamList } from '@navigation/UnAuth/unAuthNavigator.model';
import { useAuthStore } from '@store/auth/auth.store';
import MainButtonComponent from '@components/MainButton.component';

interface ForgotPasswordFooterProps {
  loading: boolean;
  isFieldFocused: boolean;
  onForgetPassword: () => void;
}

const ForgotPasswordFooter: React.FC<ForgotPasswordFooterProps> = ({
  loading,
  isFieldFocused,
  onForgetPassword,
}) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<UnAuthStackParamList>>();

  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isFieldFocused) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 0,
          delay: 0,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          delay: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFieldFocused]);

  const navigateToLogin = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    navigation.navigate(UnAuthScreenNames.Login);
  };

  const handleForgetPassword = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onForgetPassword();
  };

  if (isFieldFocused) {
    return null;
  }

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }, { scale }],
      }}
    >
      <MainButtonComponent
        title={t('forgotPassword.button')}
        onPress={handleForgetPassword}
        loading={loading}
      />
    </Animated.View>
  );
};

export default ForgotPasswordFooter;
