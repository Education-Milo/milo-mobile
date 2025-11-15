import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';
import { Flame, Clock, Target } from 'lucide-react-native';

interface QCMResultsScreenProps {
  score: number;
  totalQuestions: number;
  totalTime: number;
  xpEarned: number;
  onRestart: () => void;
  onBackToHome: () => void;
}

const QCMResultsScreen: React.FC<QCMResultsScreenProps> = ({
  score,
  totalQuestions,
  totalTime,
  xpEarned,
  onRestart,
  onBackToHome
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <SafeAreaView style={styles.resultsContainer}>
      <View style={styles.resultsContent}>
        {/* Titre */}
        <View style={styles.headerSection}>
          <TypographyComponent variant="h3" style={styles.resultsTitle}>
            Excellent travail !
          </TypographyComponent>
          <TypographyComponent variant="body" color={colors.text.secondary} style={styles.resultsSubtitle}>
            Tu as gagné {xpEarned} XP dans cette leçon
          </TypographyComponent>
        </View>
        {/* Cartes côte à côte */}
        <View style={styles.cardsContainer}>
          {/* Carte XP */}
          <View style={[styles.card, styles.cardXP]}>
            <TypographyComponent variant="labelSmall" style={styles.cardTitle}>
              TOTAL XP
            </TypographyComponent>
            <View style={styles.cardIconContainer}>
              <Flame size={32} color="#F4922A" />
            </View>
            <TypographyComponent variant="h2" style={styles.cardValueXP}>
              {xpEarned}
            </TypographyComponent>
          </View>
          {/* Carte Temps */}
          <View style={[styles.card, styles.cardTime]}>
            <TypographyComponent variant="labelSmall" style={styles.cardTitle}>
              TEMPS
            </TypographyComponent>
            <View style={styles.cardIconContainer}>
              <Clock size={32} color="#3B9DFF" />
            </View>
            <TypographyComponent variant="h2" style={styles.cardValueTime}>
              {formatTime(totalTime)}
            </TypographyComponent>
          </View>
          {/* Carte Score */}
          <View style={[styles.card, styles.cardScore]}>
            <TypographyComponent variant="labelSmall" style={styles.cardTitle}>
              SCORE
            </TypographyComponent>
            <View style={styles.cardIconContainer}>
              <Target size={32} color="#4CAF50" />
            </View>
            <TypographyComponent variant="h2" style={styles.cardValueScore}>
              {percentage}%
            </TypographyComponent>
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.resultsButtons}>
          <TouchableOpacity 
            style={[styles.resultButton, styles.restartButton]}
            onPress={onRestart}
          >
            <TypographyComponent variant="button" style={styles.restartButtonText}>
              Recommencer le quiz
            </TypographyComponent>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.resultButton, styles.homeButton]}
            onPress={onBackToHome}
          >
            <TypographyComponent variant="button" style={styles.homeButtonText}>
              Retour à l'accueil
            </TypographyComponent>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  resultsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  resultsSubtitle: {
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 160,
    justifyContent: 'space-between',
    borderWidth: 3,
  },
  cardXP: {
    backgroundColor: '#FFF9F0',
    borderColor: '#F4922A',
  },
  cardTime: {
    backgroundColor: '#F0F8FF',
    borderColor: '#3B9DFF',
  },
  cardScore: {
    backgroundColor: '#F1F8F4',
    borderColor: '#4CAF50',
  },
  cardTitle: {
    fontWeight: '700',
    color: '#666',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  cardIconContainer: {
    marginVertical: 8,
  },
  cardValueXP: {
    color: '#F4922A',
    textAlign: 'center',
  },
  cardValueTime: {
    color: '#3B9DFF',
    textAlign: 'center',
  },
  cardValueScore: {
    color: '#4CAF50',
    textAlign: 'center',
  },
  resultsButtons: {
    gap: 12,
  },
  resultButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restartButton: {
    backgroundColor: '#F4922A',
  },
  homeButton: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: '#F4922A',
    paddingVertical: 14,
  },
  restartButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  homeButtonText: {
    color: '#F4922A',
    fontWeight: '600',
  },
});

export default QCMResultsScreen;