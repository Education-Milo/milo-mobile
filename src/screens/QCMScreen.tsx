import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QCMErrorModal from '@components/QCMErrorModal.component';
import QCMSuccessModal from '@components/QCMSuccessModal.component';
import { colors } from '@theme/colors';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QCMScreenProps {
  questions: Question[];
  onQuizComplete: (score: number, totalTime: number) => void;
  onQuit: () => void;
}

const QCMScreen: React.FC<QCMScreenProps> = ({ questions, onQuizComplete, onQuit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(Date.now());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  
  // États pour les modals
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState('');
  
  // Animation pour les options
  const [scaleAnims] = useState(
    questions[0].options.map(() => new Animated.Value(1))
  );

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  const handleAnswerSelect = (answer: string, index: number) => {
    setSelectedAnswer(answer);
    
    // Animation de "bounce" sur la sélection
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
      setLives(prev => Math.max(0, prev - 1));
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      // Réinitialiser les animations
      scaleAnims.forEach(anim => anim.setValue(1));
    } else {
      const endTime = Date.now();
      const timeTaken = Math.round((endTime - startTime) / 1000);
      onQuizComplete(isCorrect ? score + 1 : score, timeTaken);
    }
  };

  const handleValidate = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    
    if (correct) {
      setIsSuccessModalVisible(true);
    } else {
      setCurrentCorrectAnswer(currentQuestion.correctAnswer);
      setIsErrorModalVisible(true);
    }
  };
  
  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false);
    setSelectedAnswer(null);
    handleNextQuestion(false);
  };
  
  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false);
    setSelectedAnswer(null);
    handleNextQuestion(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête amélioré avec vies */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onQuit}>
          <Ionicons name="close" size={24} color="#FF6B6B" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1}/{questions.length}
            </Text>
          </View>

          {/* Affichage du streak si > 1 */}
          {streak > 1 && (
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={16} color="#FF6B6B" />
              <Text style={styles.streakText}>{streak}</Text>
            </View>
          )}
        </View>

        {/* Système de vies */}
        <View style={styles.livesContainer}>
          {[...Array(3)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < lives ? "heart" : "heart-outline"}
              size={24}
              color={i < lives ? "#FF6B6B" : "#DDD"}
              style={styles.heartIcon}
            />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Icône de la question (personnalisable selon le type) */}
        <View style={styles.questionIconContainer}>
          <View style={styles.questionIconCircle}>
            <Ionicons name="help-circle" size={40} color="#F4922A" />
          </View>
        </View>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <Animated.View
              key={index}
              style={{ transform: [{ scale: scaleAnims[index] }] }}
            >
              <TouchableOpacity
                style={[
                  styles.option,
                  selectedAnswer === option && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(option, index)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.optionIndicator,
                  selectedAnswer === option && styles.selectedOptionIndicator
                ]}>
                  <Text style={[
                    styles.optionIndicatorText,
                    selectedAnswer === option && styles.selectedOptionIndicatorText
                  ]}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={[
                  styles.optionText,
                  selectedAnswer === option && styles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Footer avec bouton de validation amélioré */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.validateButton,
            !selectedAnswer && styles.disabledButton
          ]}
          onPress={handleValidate}
          disabled={!selectedAnswer}
          activeOpacity={0.8}
        >
          <Text style={styles.validateButtonText}>
            {selectedAnswer ? "Valider ma réponse" : "Sélectionne une réponse"}
          </Text>
          {selectedAnswer && (
            <Ionicons name="checkmark-circle" size={24} color="#FFF" style={styles.buttonIcon} />
          )}
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <QCMErrorModal
        isVisible={isErrorModalVisible}
        correctAnswer={currentCorrectAnswer}
        onClose={handleCloseErrorModal}
      />
      <QCMSuccessModal
        isVisible={isSuccessModalVisible}
        onClose={handleCloseSuccessModal}
        streak={streak}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EAED',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#E8EAED',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F4922A',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  streakText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginLeft: 4,
  },
  livesContainer: {
    flexDirection: 'row',
  },
  heartIcon: {
    marginLeft: 4,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  questionIconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  questionIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF4E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 32,
    lineHeight: 32,
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E8EAED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedOption: {
    borderColor: '#F4922A',
    backgroundColor: '#FFF4E6',
    shadowColor: '#F4922A',
    shadowOpacity: 0.15,
    elevation: 4,
  },
  optionIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedOptionIndicator: {
    backgroundColor: '#F4922A',
  },
  optionIndicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
  },
  selectedOptionIndicatorText: {
    color: '#FFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  selectedOptionText: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
  },
  validateButton: {
    backgroundColor: '#F4922A',
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F4922A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#E8EAED',
    shadowOpacity: 0,
  },
  validateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default QCMScreen;