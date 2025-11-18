import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import TypographyComponent from '@components/Typography.component';
import BadgeItem from '@components/missions/BadgeItem.component';
import { MonthlyBadge } from '@hooks/useMissionsScreen';

interface BadgeCalendarCardProps {
  badgesByYear: Record<number, MonthlyBadge[]>;
  sortedYears: number[];
}

const BadgeCalendarCard = ({ badgesByYear, sortedYears }: BadgeCalendarCardProps) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(300).duration(600).springify()}
      style={styles.badgeCalendarCard}
    >
      <View style={styles.sectionHeader}>
        <TypographyComponent variant="h4" style={styles.sectionTitle}>
          🏆 Badges Mensuels
        </TypographyComponent>
      </View>
      
      {sortedYears.map((year) => (
        <View key={year} style={styles.badgeYearSection}>
          <TypographyComponent variant="h5" style={styles.badgeYearTitle}>
            Badges {year}
          </TypographyComponent>
          <View style={styles.badgeGrid}>
            {badgesByYear[year].map((badge, index) => (
              <BadgeItem 
                key={badge.id} 
                badge={badge} 
                index={index}
              />
            ))}
          </View>
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badgeCalendarCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
  },
  badgeYearSection: {
    marginTop: 16,
  },
  badgeYearTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 16,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});

export default BadgeCalendarCard;