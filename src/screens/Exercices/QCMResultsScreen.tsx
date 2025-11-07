import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';

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

  return (
    <SafeAreaView style={styles.resultsContainer}>
      <View style={styles.resultsContent}>
        {/* Titre moins imposant */}
        <Text style={styles.resultsTitle}>Quiz Terminé</Text>
        
        {/* Cartes côte à côte */}
        <View style={styles.cardsContainer}>
          {/* Carte XP */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>XP GAGNÉS</Text>
            <Text style={styles.cardValue}>{xpEarned}</Text>
          </View>
          
          {/* Carte Score */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>SCORE</Text>
            <Text style={styles.cardValue}>
              {Math.round((score / totalQuestions) * 100)}%
            </Text>
            <Text style={styles.cardSubtitle}>
              {score}/{totalQuestions}
            </Text>
          </View>
          
          {/* Carte Temps */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>TEMPS</Text>
            <Text style={styles.cardValue}>{formatTime(totalTime)}</Text>
            <Text style={styles.cardSubtitle}>minutes</Text>
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.resultsButtons}>
          <TouchableOpacity 
            style={[styles.resultButton, styles.restartButton]}
            onPress={onRestart}
          >
            <Text style={styles.restartButtonText}>Recommencer le quiz</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.resultButton, styles.homeButton]}
            onPress={onBackToHome}
          >
            <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
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
  resultsTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'System',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    minHeight: 120,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'System',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4922A',
    textAlign: 'center',
    fontFamily: 'System',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'System',
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F4922A',
    paddingVertical: 14,
  },
  restartButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  homeButtonText: {
    color: '#F4922A',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
});

export default QCMResultsScreen;

