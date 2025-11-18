import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import TypographyComponent from '@components/Typography.component';
import MissionItem from '@components/missions/MissionItem.component';
import { DailyMission } from '@hooks/useMissionsScreen';

interface DailyMissionsCardProps {
  missions: DailyMission[];
}

const DailyMissionsCard = ({ missions }: DailyMissionsCardProps) => {
  return (
    <Animated.View 
      entering={FadeInDown.delay(200).duration(600).springify()}
      style={styles.dailyMissionsCard}
    >
      <View style={styles.sectionHeader}>
        <TypographyComponent variant="h4" style={styles.sectionTitle}>
          🎯 Missions du jour
        </TypographyComponent>
        <View style={styles.timerBadge}>
          <TypographyComponent variant="caption" style={styles.timerText}>
            ⏳ 8 HEURES
          </TypographyComponent>
        </View>
      </View>
      
      <View style={styles.dailyMissionsList}>
        {missions.map((mission, index) => (
          <MissionItem 
            key={mission.id} 
            mission={mission} 
            index={index}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  dailyMissionsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
  },
  timerBadge: {
    backgroundColor: '#fef3e6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f59e0b',
  },
  dailyMissionsList: {
    gap: 12,
  },
});

export default DailyMissionsCard;