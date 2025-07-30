import { colors } from "@themes/colors";
import { View, TouchableOpacity, ScrollView, SafeAreaView, Modal, Animated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import TypographyComponent from '../Typography.component';

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
  feedback?: string | null; // Ajout feedback
  onGoBack?: () => void;
  onNext?: () => void; // Ajout onNext
  canGoNext?: boolean; // Ajout canGoNext
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

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FFF8F1',
    }}>
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
          </View>

          {/* Barre de progression */}
          <View style={{
            height: 16,
            backgroundColor: '#374151',
            borderRadius: 8,
            overflow: 'hidden'
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
            color: '#FFFFFF',
            lineHeight: 36,
            marginBottom: 48
          }}
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
        {/* Feedback immédiat après la réponse + bouton suivant dans une Modal animée */}
        <Modal
          visible={!!feedback}
          transparent
          animationType="slide"
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.25)' }}>
            <View style={{
              width: '100%',
              backgroundColor: feedback === 'correct' ? '#065F46' : '#7F1D1D',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              borderWidth: 1,
              borderColor: feedback === 'correct' ? '#10B981' : '#EF4444',
              alignItems: 'center',
              padding: 28,
              paddingBottom: 36,
              minHeight: 180
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
                  style={{ fontSize: 18, fontWeight: '600' }}
                  color={feedback === 'correct' ? '#6EE7B7' : '#FCA5A5'}
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
              {/* Bouton suivant dans la modal */}
              {canGoNext && (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#10B981',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginTop: 8,
                    minWidth: 160
                  }}
                  onPress={onNext}
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
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default QuestionComponent;