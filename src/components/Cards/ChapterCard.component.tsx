import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

interface ChapterCardProps {
  userName?: string;
  courseTitle?: string;
  onPress?: () => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  userName = '...',
  courseTitle = 'matière',
  onPress
}) => {
  const CardContent = (
    <LinearGradient
      colors={['#FF8C00', '#FF6B00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require('@assets/images/milo_maths.png')}
          style={styles.miloImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <TypographyComponent
          variant="bodySmall"
          style={styles.title}
          color={colors.text.white}
        >
          Bienvenue en {courseTitle} {userName} !
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
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 20,
    // Ombre pour iOS
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Ombre pour Android
    elevation: 8,
  },
  gradientContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    overflow: 'visible',
  },
  imageContainer: {
    width: '100%',
    height: 160,
    marginRight: 16,
    marginLeft: -10,
  },
  miloImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default ChapterCard;