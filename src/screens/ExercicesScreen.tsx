import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { useIAStore } from '@store/ia/ia.store';
import QuestionComponent from '@components/Lesson/QuestionComponent';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ExercicesScreenProps {
  navigation: NavigationProp;
  route: RouteProp<RootStackParamList, 'ExercicesScreen'>;
}

function ExercicesScreen({ navigation, route }: ExercicesScreenProps) {
  const { matiere, chapitre } = route.params;
  const { create_qcm, currentQCM, isLoading, error } = useIAStore();
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  useEffect(() => {
    generateQCM();
  }, []);

  const generateQCM = async () => {
    try {
      const theme = `${matiere} - ${chapitre}`;
      await create_qcm(theme);
      setUserAnswers({});
      setCurrentQuestionIndex(0);
      setFeedback(null);
      setScore(null);
      setQuizCompleted(false);
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Impossible de générer le QCM. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleAnswerSelect = (selectedAnswer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedAnswer
    }));
    if (!currentQCM) return;
    const isCorrect = selectedAnswer === currentQCM.qcm[currentQuestionIndex].correct_answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setCanGoNext(true);
  };

  const handleNext = () => {
    setFeedback(null);
    setCanGoNext(false);
    if (currentQCM && currentQuestionIndex < currentQCM.qcm.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleValidateQuiz = () => {
    if (!currentQCM) return;

    const totalQuestions = currentQCM.qcm.length;
    const answeredQuestions = Object.keys(userAnswers).length;

    if (answeredQuestions < totalQuestions) {
      Alert.alert(
        'Quiz incomplet',
        `Vous avez répondu à ${answeredQuestions} questions sur ${totalQuestions}. Voulez-vous valider quand même ?`,
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Valider', onPress: calculateScore }
        ]
      );
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    if (!currentQCM) return;

    let correctAnswers = 0;
    currentQCM.qcm.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / currentQCM.qcm.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setScore(null);
    setQuizCompleted(false);
  };

  // Écran de chargement
  if (isLoading) {
    return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#FFF8F1'
        }}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={{
            marginTop: 20,
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 16
          }}>
            Génération du QCM en cours...
          </Text>
        </View>
    );
  }

  // Écran d'erreur
  if (error) {
    return (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 20, 
          backgroundColor: '#1F2937'
        }}>
          <View style={{ 
            padding: 30, 
            alignItems: 'center', 
            width: '100%',
            backgroundColor: '#374151',
            borderRadius: 16
          }}>
            <Text style={{ fontSize: 48, marginBottom: 20 }}>⚠️</Text>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: 'bold',
              marginBottom: 15, 
              textAlign: 'center',
              color: '#FFFFFF'
            }}>
              Erreur
            </Text>
            <Text style={{ 
              marginBottom: 25, 
              textAlign: 'center',
              color: '#9CA3AF',
              fontSize: 16,
              lineHeight: 22
            }}>
              {error}
            </Text>
            <TouchableOpacity 
              style={{
                backgroundColor: '#10B981',
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 12,
                minWidth: 120
              }} 
              onPress={generateQCM}
            >
              <Text style={{ 
                color: '#FFFFFF', 
                fontWeight: 'bold', 
                fontSize: 16, 
                textAlign: 'center' 
              }}>
                Réessayer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }

  // Écran de fin de quiz
  if (quizCompleted) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF8F1' }}>
        {/* Bouton retour chapitre */}
        <TouchableOpacity
          onPress={handleGoBack}
          style={{
            position: 'absolute',
            top: 30,
            left: 20,
            zIndex: 10,
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(55,65,81,0.8)',
            borderRadius: 22
          }}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#1F2937' }}>
          <View style={{ padding: 30, alignItems: 'center', width: '100%', backgroundColor: '#374151', borderRadius: 16 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#10B981', marginBottom: 16 }}>Résultat</Text>
            <Text style={{ fontSize: 22, color: '#FFFFFF', marginBottom: 10 }}>{score}% de bonnes réponses</Text>
            <Text style={{ fontSize: 16, color: '#9CA3AF', marginBottom: 30 }}>
              {`Vous avez répondu correctement à ${score !== null && currentQCM ? Math.round((score/100)*currentQCM.qcm.length) : 0} question(s) sur ${currentQCM?.qcm.length || 0}.`}
            </Text>
            <TouchableOpacity 
              style={{ backgroundColor: '#10B981', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, minWidth: 120, marginBottom: 10 }}
              onPress={generateQCM}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Nouveau QCM</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ backgroundColor: '#6B7280', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, minWidth: 120 }}
              onPress={resetQuiz}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Recommencer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Vue principale du quiz avec question
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF8F1' }}>
      {currentQCM && (
        <QuestionComponent
          question={currentQCM.qcm[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={currentQCM.qcm.length}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          showCorrection={!!feedback}
          feedback={feedback}
          onGoBack={handleGoBack}
          onNext={handleNext}
          canGoNext={canGoNext}
        />
      )}
    </View>
  );
}

export default ExercicesScreen;