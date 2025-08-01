import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import Particle from '@components/Particle.component';

interface FireworksAnimationProps {
  isVisible: boolean;
  particleCount?: number;
  duration?: number;
  containerSize?: number;
  particleDistance?: number;
  particleSize?: number;
  colors?: string[];
  position?: {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
  onAnimationComplete?: () => void;
}

const FireworksAnimation: React.FC<FireworksAnimationProps> = ({
  isVisible,
  particleCount = 12,
  duration = 2000,
  containerSize = 300,
  particleDistance = 120,
  particleSize = 20,
  colors,
  position = { bottom: 100, alignItems: 'center' },
  onAnimationComplete,
}) => {
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const [showParticles, setShowParticles] = useState(false);
  const completedAnimations = useRef(0);

  useEffect(() => {
    if (isVisible) {
      setShowParticles(true);
      completedAnimations.current = 0;
      // Fade in du container
      Animated.timing(containerOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Programmer la disparition
      setTimeout(() => {
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowParticles(false);
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        });
      }, duration + 500);
    } else {
      setShowParticles(false);
      containerOpacity.setValue(0);
    }
  }, [isVisible, containerOpacity, duration, onAnimationComplete]);

  const handleParticleComplete = () => {
    completedAnimations.current += 1;
  };

  if (!showParticles) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        justifyContent: position.top ? 'flex-start' : 'flex-end',
        alignItems: 'center',
        paddingTop: typeof position.top === 'number' ? position.top : 0,
        paddingBottom: typeof position.bottom === 'number' ? position.bottom : 0,
        paddingLeft: typeof position.left === 'number' ? position.left : 0,
        paddingRight: typeof position.right === 'number' ? position.right : 0,
      }}
      pointerEvents="none"
    >
      <Animated.View
        style={{
          opacity: containerOpacity,
          width: containerSize,
          height: containerSize,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {Array.from({ length: particleCount }, (_, index) => (
          <Particle
            key={`particle-${index}`}
            index={index}
            totalParticles={particleCount}
            distance={particleDistance}
            duration={duration}
            size={particleSize}
            colors={colors}
            onAnimationComplete={handleParticleComplete}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default FireworksAnimation;