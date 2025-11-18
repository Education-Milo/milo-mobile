import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import TypographyComponent from '@components/Typography.component';
import { DailyMission } from '@hooks/useMissionsScreen';

interface MissionItemProps {
  mission: DailyMission;
  index: number;
}

const MissionItem = ({ mission, index }: MissionItemProps) => {
  const progressPercent = (mission.progressCurrent / mission.progressTotal) * 100;

  return (
    <Animated.View 
      entering={FadeInDown.delay(300 + index * 50).duration(600).springify()}
      style={styles.missionItem}
    >
      <View style={styles.missionIcon}>
        <Text style={styles.missionIconText}>{mission.icon}</Text>
      </View>
      <View style={styles.missionInfo}>
        <TypographyComponent variant="body" style={styles.missionTitle}>
          {mission.title}
        </TypographyComponent>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <TypographyComponent variant="caption" style={styles.progressText}>
            {mission.progressCurrent}/{mission.progressTotal}
          </TypographyComponent>
        </View>
      </View>
      <View style={styles.missionReward}>
        <TypographyComponent variant="caption" style={styles.rewardText}>
          +{mission.rewardPoints} pts
        </TypographyComponent>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  missionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  missionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  missionIconText: {
    fontSize: 24,
  },
  missionInfo: {
    flex: 1,
    gap: 6,
  },
  missionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a202c',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5568',
    minWidth: 45,
  },
  missionReward: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rewardText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
  },
});

export default MissionItem;