import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';

interface WelcomeCardProps {
  userName?: string;
  onPress?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  userName = '...',
  onPress
}) => {
  const CardContent = (
    <LinearGradient
      colors={['#fdba74', '#f97316']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require('@assets/images/Milo_cours.png')}
          style={styles.miloImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <TypographyComponent
          variant="h3"
          style={styles.title}
        >
          Bonjour {userName} !
        </TypographyComponent>
        <TypographyComponent
          variant="body"
          style={styles.subtitle}
        >
          Prêt à explorer de nouvelles matières ? Choisis un cours pour commencer.
        </TypographyComponent>
      </View>
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.container}
      >
        {CardContent}
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>{CardContent}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
    overflow: 'hidden',
    // Ombre pour iOS
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Ombre pour Android
    elevation: 8,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    minHeight: 140,
  },
  imageContainer: {
    width: 100,
    height: 120,
    marginRight: 16,
    marginTop: -10,
    marginLeft: -10,
  },
  miloImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default WelcomeCard;