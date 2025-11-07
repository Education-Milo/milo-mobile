import React, { useState, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import QCMScreen from './Exercices/QCMScreen';
import QCMResultsScreen from './Exercices/QCMResultsScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExercicesScreen'>;
type ExercicesRouteProp = RouteProp<RootStackParamList, 'ExercicesScreen'>;

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface ExercicesScreenProps {
  navigation: NavigationProp;
  route: ExercicesRouteProp;
}

const ExercicesScreen: React.FC<ExercicesScreenProps> = ({ navigation, route }) => {
  // Données d'exemple pour le QCM
  const [questions] = useState<Question[]>([
    {
      id: 1,
      question: "Quelle est la capitale de la France?",
      options: ["Londres", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "Quel est le plus grand océan du monde?",
      options: ["Atlantique", "Indien", "Arctique", "Pacifique"],
      correctAnswer: "Pacifique"
    },
    {
      id: 3,
      question: "Combien de côtés a un hexagone?",
      options: ["4", "5", "6", "8"],
      correctAnswer: "6"
    }
  ]);

  const [showResultsScreen, setShowResultsScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    // Calcul des XP gagnés basé sur le score
    if (showResultsScreen) {
      const baseXP = 10;
      const bonusXP = Math.round((score / questions.length) * 10);
      setXpEarned(baseXP + bonusXP);
    }
  }, [showResultsScreen, score, questions.length]);

  const handleQuizComplete = (finalScore: number, timeTaken: number) => {
    setScore(finalScore);
    setTotalTime(timeTaken);
    setShowResultsScreen(true);
  };

  const handleQuit = () => {
    navigation.goBack();
  };

  const handleRestartQuiz = () => {
    setShowResultsScreen(false);
    setScore(0);
    setTotalTime(0);
    setXpEarned(0);
  };

  const handleBackToHome = () => {
    navigation.goBack();
  };

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

export default ExercicesScreen;