import React, { useRef, useState, useEffect } from 'react';
import { colors } from "@themes/colors";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import TypographyComponent from '../Typography.component';
import BottomSheetComponent from '../BottomSheetModal.component';
import FireworksAnimation from '@components/FireWorkAnimation.component'; // Votre nouveau composant
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface QuestionComponentProps {
  question: {
    question: string;
    options: string[];
    correct_answer: string;
  };
  questionIndex: number;
  totalQuestions: number;
  onAnswerSelect: (selectedAnswer: string) => void;
  selectedAnswer?: string;
  showCorrection: boolean;
  feedback?: string | null;
  onGoBack?: () => void;
  onNext?: () => void;
  canGoNext?: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswerSelect,
  selectedAnswer,
  showCorrection,
  feedback,
  onGoBack,
  onNext,
  canGoNext
}) => {
  const progressPercentage = ((questionIndex + 1) / totalQuestions) * 100;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  // Gérer l'ouverture du bottom sheet et le déclenchement des feux d'artifice
  useEffect(() => {
    if (feedback && bottomSheetRef.current) {
      setTimeout(() => {
        bottomSheetRef.current?.present();
        setIsBottomSheetOpen(true);
        // Déclencher les feux d'artifice pour une bonne réponse
        if (feedback === 'correct') {
          setTimeout(() => {
            setShowFireworks(true);
          }, 300); // Délai pour que le BottomSheet soit ouvert
        }
      }, 100);
    } else {
      setIsBottomSheetOpen(false);
      setShowFireworks(false);
    }
  }, [feedback]);

  const handleFireworksComplete = () => {
    setShowFireworks(false);
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFF8F1',
    }}>
      {/* Animation de feux d'artifice */}
      <FireworksAnimation
        isVisible={showFireworks}
        particleCount={15}
        duration={2500}
        containerSize={350}
        particleDistance={140}
        particleSize={22}
        position={{ bottom: 100, left: 350 }}
        onAnimationComplete={handleFireworksComplete}
        colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FF8A80', '#A7FFEB', '#DDA0DD', '#98FB98']}
      />

      <View style={{ backgroundColor: '#FFF8F1' }}>
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 0,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 4
          }}>
            <TouchableOpacity
              onPress={onGoBack}
              style={{
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Ionicons name="close" size={32} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Barre de progression */}
            <View style={{
              height: 16,
              backgroundColor: '#374151',
              borderRadius: 8,
              overflow: 'hidden',
              flex: 1,
              marginLeft: 20
            }}>
              <View style={{
                height: '100%',
                backgroundColor: '#10B981',
                borderRadius: 8,
                width: `${progressPercentage}%`,
              }} />
            </View>
          </View>
        </View>
      </View>

      {/* Contenu principal */}
      <ScrollView style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
      }} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Type d'exercice */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 32
        }}>
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#8B5CF6',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
          }}>
            <Ionicons name="help-circle" size={20} color="white" />
          </View>
          <TypographyComponent
            variant="h6"
            color='#8B5CF6'
            style={{
              fontSize: 16,
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: 1
            }}
          >
            QUESTION À CHOIX MULTIPLES
          </TypographyComponent>
        </View>

        {/* Question */}
        <TypographyComponent
          style={{
            fontSize: 28,
            fontWeight: '700',
            lineHeight: 36,
            marginBottom: 48
          }}
          color={colors.text.secondary}
        >
          {question.question}
        </TypographyComponent>

        {/* Options de réponse */}
        <View style={{ gap: 16 }}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correct_answer;
            let optionStyles = {
              container: {
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#4B5563',
                backgroundColor: '#374151',
                minHeight: 56,
                justifyContent: 'center' as const,
                paddingHorizontal: 20,
                paddingVertical: 16,
              },
              text: {
                fontSize: 18,
                fontWeight: '500' as const,
                color: '#FFFFFF',
                textAlign: 'left' as const,
              }
            };
            if (showCorrection) {
              if (isCorrect) {
                optionStyles.container.backgroundColor = '#065F46';
                optionStyles.container.borderColor = '#10B981';
                optionStyles.text.color = '#6EE7B7';
              } else if (isSelected && !isCorrect) {
                optionStyles.container.backgroundColor = '#7F1D1D';
                optionStyles.container.borderColor = '#EF4444';
                optionStyles.text.color = '#FCA5A5';
              } else {
                optionStyles.container.backgroundColor = '#374151';
                optionStyles.container.borderColor = '#4B5563';
                optionStyles.text.color = '#9CA3AF';
              }
            } else if (isSelected) {
              optionStyles.container.backgroundColor = '#1E3A8A';
              optionStyles.container.borderColor = '#3B82F6';
              optionStyles.text.color = '#93C5FD';
            }
            return (
              <TouchableOpacity
                key={index}
                style={optionStyles.container}
                onPress={() => !showCorrection && !feedback && onAnswerSelect(option)}
                disabled={showCorrection || !!feedback}
                activeOpacity={0.8}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <TypographyComponent style={[optionStyles.text, { flex: 1 }]}>
                    {option}
                  </TypographyComponent>
                  {/* Icône de statut */}
                  {showCorrection && (
                    <View style={{ marginLeft: 12 }}>
                      {isCorrect && (
                        <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center' }}>
                          <Ionicons name="checkmark" size={16} color="white" />
                        </View>
                      )}
                      {isSelected && !isCorrect && (
                        <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center' }}>
                          <Ionicons name="close" size={16} color="white" />
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* BottomSheet pour le feedback */}
      <BottomSheetComponent
        ref={bottomSheetRef as React.RefObject<BottomSheetModal>}
        snapPoints={['40%']}
        index={feedback ? 0 : -1}
      >
        <View style={{
          alignItems: 'center',
          padding: 28,
          paddingBottom: 36,
          minHeight: 180,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'center' }}>
            <View style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: feedback === 'correct' ? '#10B981' : '#EF4444',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12
            }}>
              <Ionicons
                name={feedback === 'correct' ? "checkmark" : "close"}
                size={18}
                color="white"
              />
            </View>
            <TypographyComponent
              style={{ fontSize: 18 }}
              color={feedback === 'correct' ? 'green' : 'red'}
            >
              {feedback === 'correct' ? 'Bonne réponse !' : 'Mauvaise réponse'}
            </TypographyComponent>
          </View>
          {feedback === 'incorrect' && (
            <TypographyComponent
              style={{ fontSize: 16, lineHeight: 22, marginBottom: 12 }}
              color='#D1D5DB'
            >
              Bonne réponse : <TypographyComponent style={{ fontWeight: '600' }} color='#6EE7B7'>{question.correct_answer}</TypographyComponent>
            </TypographyComponent>
          )}
          {/* Bouton suivant dans le bottom sheet */}
          {canGoNext && (
            <TouchableOpacity
              style={{
                backgroundColor: '#4F46E5',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 20,
                alignItems: 'center',
                marginTop: 8,
                minWidth: 160
              }}
              onPress={() => {
                bottomSheetRef.current?.dismiss();
                onNext?.();
              }}
            >
              <TypographyComponent
                style={{ fontWeight: 'bold', fontSize: 16 }}
                color='#fff'
              >
                {questionIndex === totalQuestions - 1 ? 'Voir mes résultats' : 'Question suivante'}
              </TypographyComponent>
            </TouchableOpacity>
          )}
        </View>
      </BottomSheetComponent>
    </View>
  );
};

export default QuestionComponent;