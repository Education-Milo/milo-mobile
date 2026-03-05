import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import QCMScreen from '@screens/QCMScreen';
import QCMResultsScreen from '@screens/QCMResultsScreen';
import useExerciseScreen from '@hooks/useExerciseScreen';

const ExercicesScreen = () => {
  const {
    questions,
    loading,
    error,
    showResultsScreen,
    score,
    totalTime,
    xpEarned,
    handleQuizComplete,
    handleQuit,
    handleRestartQuiz,
    handleBackToHome,
  } = useExerciseScreen();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (showResultsScreen) {
    return (
      <QCMResultsScreen
        score={score}
        totalQuestions={questions.length}
        totalTime={totalTime}
        xpEarned={xpEarned}
        onRestart={handleRestartQuiz}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <QCMScreen
      questions={questions}
      onQuizComplete={handleQuizComplete}
      onQuit={handleQuit}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ExercicesScreen;