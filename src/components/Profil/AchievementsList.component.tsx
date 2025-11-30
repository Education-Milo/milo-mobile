import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Trophy } from 'lucide-react-native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

interface Achievement {
  id: string;
  title: string;
  desc: string;
  progress: number;
  total: number;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementRow = ({ title, desc, progress, total }: Omit<Achievement, 'id'>) => {
  const isCompleted = progress >= total;
  const percent = (progress / total) * 100;

  return (
    <View style={styles.achievementRow}>
      <View style={[styles.achievementIcon, isCompleted ? styles.achievementCompleted : null]}>
        <Trophy size={24} color={isCompleted ? '#FFD700' : '#CCC'} />
      </View>
      <View style={styles.achievementContent}>
        <TypographyComponent variant="h6">{title}</TypographyComponent>
        <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{marginBottom: 6}}>
          {desc}
        </TypographyComponent>

        {/* Barre de progression */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
        </View>
        <View style={{flexDirection:'row', justifyContent: 'flex-end', marginTop: 2}}>
           <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
             {progress} / {total}
           </TypographyComponent>
        </View>
      </View>
    </View>
  );
};

const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
         <TypographyComponent variant="h5">Succès</TypographyComponent>
         <TouchableOpacity>
           <TypographyComponent variant="label" color={colors.primary}>TOUT VOIR</TypographyComponent>
         </TouchableOpacity>
      </View>

      <View style={styles.achievementsList}>
        {achievements.map((succes) => (
          <AchievementRow key={succes.id} {...succes} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 16,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementCompleted: {
    backgroundColor: '#FFFBE6',
  },
  achievementContent: {
    flex: 1,
    paddingVertical: 4,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
});

export default AchievementsSection;