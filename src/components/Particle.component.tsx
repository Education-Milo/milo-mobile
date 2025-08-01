import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface ParticleProps {
  index: number;
  totalParticles: number;
  distance?: number;
  duration?: number;
  delay?: number;
  colors?: string[];
  size?: number;
  onAnimationComplete?: () => void;
}

const Particle: React.FC<ParticleProps> = ({
  index,
  totalParticles,
  distance = 120,
  duration = 2000,
  delay = 0,
  colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FF8A80', '#A7FFEB'],
  size = 20,
  onAnimationComplete,
}) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  
  // Calculer l'angle pour répartir les particules en cercle
  const angle = (index * (360 / totalParticles)) * (Math.PI / 180);
  const particleColor = colors[index % colors.length];

  useEffect(() => {
    // Démarrer l'animation avec un délai
    const animation = Animated.sequence([
      Animated.delay(delay + index * 50), // Délai progressif
      Animated.timing(animationValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]);

    animation.start(({ finished }) => {
      if (finished && onAnimationComplete) {
        onAnimationComplete();
      }
    });

    return () => {
      animation.stop();
    };
  }, [animationValue, delay, duration, index, onAnimationComplete]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: particleColor,
        shadowColor: particleColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 10,
        left: -size / 2, // Centrer la particule
        top: -size / 2,  // Centrer la particule
        transform: [
          {
            translateX: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, Math.cos(angle) * distance],
            }),
          },
          {
            translateY: animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, Math.sin(angle) * distance],
            }),
          },
          {
            scale: animationValue.interpolate({
              inputRange: [0, 0.2, 0.6, 1],
              outputRange: [0, 1.8, 1.2, 0],
            }),
          },
        ],
        opacity: animationValue.interpolate({
          inputRange: [0, 0.1, 0.7, 1],
          outputRange: [0, 1, 0.8, 0],
        }),
      }}
    />
  );
};

export default Particle;