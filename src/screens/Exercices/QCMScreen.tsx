import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Animated,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

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
  const [showResultModal, setShowResultModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(Date.now());
  const [score, setScore] = useState(0);
  const slideAnim = useState(new Animated.Value(height))[0];

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
  }, [currentQuestionIndex, questions.length]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleValidate = () => {
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    setShowResultModal(true);
    
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handleContinue = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowResultModal(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        const endTime = Date.now();
        const timeTaken = Math.round((endTime - startTime) / 1000);
        // Utiliser une fonction pour obtenir le score à jour
        setScore(currentScore => {
          onQuizComplete(currentScore, timeTaken);
          return currentScore;
        });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête avec croix de fermeture et progression */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onQuit}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{questions.length}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedAnswer === option && styles.selectedOption
              ]}
              onPress={() => handleAnswerSelect(option)}
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
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bouton de validation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.validateButton,
            !selectedAnswer && styles.disabledButton
          ]}
          onPress={handleValidate}
          disabled={!selectedAnswer}
        >
          <Text style={styles.validateButtonText}>Valider</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de résultat */}
      <Modal
        transparent={true}
        visible={showResultModal}
        animationType="none"
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              { 
                transform: [{ translateY: slideAnim }],
                backgroundColor: isCorrect ? '#4CAF50' : '#E41C11'
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isCorrect ? 'Bonne réponse !' : 'Incorrect'}
              </Text>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.modalMessage}>
                {isCorrect 
                  ? 'Excellent travail ! Vous maîtrisez bien ce concept.' 
                  : `Bonne réponse : ${currentQuestion.correctAnswer}`
                }
              </Text>
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handleContinue}
              >
                <Text style={styles.modalButtonText}>
                  {isCorrect ? 'Continuer' : 'D\'accord'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F6EBDF',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6EBDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#ED3C1D',
    fontWeight: 'bold',
  },
  progressContainer: {
    flex: 1,
    marginLeft: 20,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#F6EBDF',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F4922A',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    lineHeight: 28,
    fontFamily: 'System',
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#F4922A',
    backgroundColor: '#F6EBDF',
  },
  optionIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F6EBDF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  selectedOptionIndicator: {
    backgroundColor: '#F4922A',
  },
  optionIndicatorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  selectedOptionIndicatorText: {
    color: '#FFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontFamily: 'System',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF8F1',
    borderTopWidth: 1,
    borderTopColor: '#F6EBDF',
  },
  validateButton: {
    backgroundColor: '#F4922A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#F6EBDF',
  },
  validateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: height * 0.3,
    justifyContent: 'space-between',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'System',
  },
  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalMessage: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'System',
  },
  modalFooter: {
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'System',
  },
});

export default QCMScreen;

