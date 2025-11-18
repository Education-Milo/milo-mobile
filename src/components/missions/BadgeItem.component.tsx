import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import TypographyComponent from '@components/Typography.component';
import { MonthlyBadge } from '@hooks/useMissionsScreen';

const { width } = Dimensions.get('window');

interface BadgeItemProps {
  badge: MonthlyBadge;
  index: number;
}

const BadgeItem = ({ badge, index }: BadgeItemProps) => {
  const getBadgeStyle = () => {
    switch (badge.status) {
      case 'earned':
        return { borderColor: '#10b981' };
      case 'missed':
        return { borderColor: '#ef4444' };
      default:
        return { borderColor: '#d1d5db' };
    }
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(500 + index * 30).duration(600).springify()}
      style={styles.badgeItem}
    >
      <View style={[styles.badgeCircle, getBadgeStyle()]}>
        {badge.status === 'locked' ? (
          <Text style={styles.badgeLockIcon}>🔒</Text>
        ) : (
          <Text style={styles.badgePlaceholder}>🏆</Text>
        )}
      </View>
      <TypographyComponent variant="caption" style={styles.badgeMonthLabel}>
        {badge.month}
      </TypographyComponent>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badgeItem: {
    width: (width - 32 - 40 - 36) / 4,
    alignItems: 'center',
    gap: 8,
  },
  badgeCircle: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: '#f9fafb',
  },
  badgeLockIcon: {
    fontSize: 24,
  },
  badgePlaceholder: {
    fontSize: 32,
  },
  badgeMonthLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4a5568',
    textAlign: 'center',
  },
});

export default BadgeItem;