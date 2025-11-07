import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, Easing, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Typography from '@components/Typography.component';
import { colors } from '@theme/colors';
import { UnAuthScreenNames } from '@navigation/UnAuth/unAuthNavigator.model';
import type { UnAuthStackParamList } from '@navigation/UnAuth/unAuthNavigator.model';

interface LoginFooterProps {
  loading: boolean;
  isFieldFocused: boolean;
}

const LoginFooter: React.FC<LoginFooterProps> = ({
  loading,
  isFieldFocused,
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
          duration: 600,
          delay: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          delay: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFieldFocused]);

  const navigateToRegister = () => {
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

    navigation.navigate(UnAuthScreenNames.Register);
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
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Typography variant="bodySmall" style={styles.dividerText}>
          OU
        </Typography>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={navigateToRegister}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Typography variant='body'>
          {t('login.noAccount')}
        </Typography>
        <Typography
          variant='bodyLarge'
          color={colors.buttonText}
          style={styles.registerText}
        >
          {` ${t('login.register')}`}
        </Typography>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginFooter;
