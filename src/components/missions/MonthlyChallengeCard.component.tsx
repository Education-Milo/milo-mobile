import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import TypographyComponent from '@components/Typography.component';
import { MonthlyChallenge } from '@hooks/useMissionsScreen';

interface MonthlyChallengeCardProps {
  challenge: MonthlyChallenge;
}

const MonthlyChallengeCard = ({ challenge }: MonthlyChallengeCardProps) => {
  const progressPercent = (challenge.questsCurrent / challenge.questsTotal) * 100;

  return (
    <Animated.View 
      entering={FadeInDown.delay(100).duration(600).springify()}
      style={styles.monthlyChallengeCard}
    >
      <View style={styles.monthlyChallengeTopContent}>
        <TypographyComponent variant="h3" style={styles.challengeTitle}>
          {challenge.title}
        </TypographyComponent>
        <TypographyComponent variant="body" style={styles.challengeDescription}>
          Termine {challenge.questsTotal} quêtes ce mois-ci pour gagner un badge exclusif !
        </TypographyComponent>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${progressPercent}%` }]} 
            />
          </View>
          <TypographyComponent variant="caption" style={styles.progressText}>
            {challenge.questsCurrent}/{challenge.questsTotal}
          </TypographyComponent>
        </View>
      </View>
      <View style={styles.monthlyChallengeBottomContent}>
        <TypographyComponent variant="body" style={styles.daysLeftText}>
          📅 {challenge.daysLeft} jours restants
        </TypographyComponent>
        <Text style={styles.foxEmoji}>🦊📚</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  monthlyChallengeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  monthlyChallengeTopContent: {
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
  },
  challengeDescription: {
    fontSize: 15,
    color: '#4a5568',
    lineHeight: 22,
    marginBottom: 16,
  },
  monthlyChallengeBottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  daysLeftText: {
    fontSize: 14,
    color: '#4a5568',
    fontWeight: '600',
  },
  foxEmoji: {
    fontSize: 40,
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
});

export default MonthlyChallengeCard;