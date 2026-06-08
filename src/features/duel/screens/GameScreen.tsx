import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "@shared/components/Layout";
import TypographyComponent from "@shared/components/Typography.component";
import { useDuel } from "@features/duel/hooks/DuelContext";
import { colors } from "@shared/theme/colors";

const GameScreen = () => {
  const { currentQuestion, answered, lastResult, myIdx, sendAnswer } =
    useDuel();
  const questionDuration = currentQuestion?.time_limit ?? 10;
  const [questionTimeLeft, setQuestionTimeLeft] = useState(questionDuration);
  const [nextQuestionTimeLeft, setNextQuestionTimeLeft] = useState(3);

  useEffect(() => {
    if (!currentQuestion || lastResult) return;

    setQuestionTimeLeft(currentQuestion.time_limit || 10);
    const interval = setInterval(() => {
      setQuestionTimeLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestion, lastResult]);

  useEffect(() => {
    if (!lastResult) {
      setNextQuestionTimeLeft(3);
      return;
    }

    setNextQuestionTimeLeft(3);
    const interval = setInterval(() => {
      setNextQuestionTimeLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastResult]);

  if (!currentQuestion) return null;

  const timerProgress = Math.max(
    0,
    Math.min(1, questionTimeLeft / questionDuration),
  );
  const isQuestionLocked = answered || questionTimeLeft === 0 || !!lastResult;
  const resultLabel =
    lastResult?.my_answer === null
      ? "Temps écoulé"
      : lastResult?.my_answer === lastResult?.good_answer
        ? "Bonne réponse !"
        : "Mauvaise réponse";
  const resultColor =
    lastResult?.my_answer === lastResult?.good_answer
      ? colors.success
      : colors.error;
  const feedbackMessage =
    lastResult?.my_answer === null
      ? "Temps écoulé, garde le rythme pour la prochaine."
      : lastResult?.my_answer === lastResult?.good_answer
        ? "Bonne réponse, bien joué !"
        : "Mauvaise réponse, n'abandonne pas.";
  const feedbackIcon =
    lastResult?.my_answer === lastResult?.good_answer
      ? "sparkles-outline"
      : "heart-outline";

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        {lastResult && (
          <View style={styles.resultBanner}>
            <Ionicons
              name={
                lastResult.my_answer === lastResult.good_answer
                  ? "checkmark-circle"
                  : "close-circle"
              }
              size={20}
              color={resultColor}
            />
            <TypographyComponent
              variant="labelSmall"
              color={resultColor}
              style={styles.ml8}
            >
              {resultLabel}
            </TypographyComponent>
            {myIdx !== null && (
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.tertiary}
                style={styles.ml8}
              >
                {lastResult.scores[String(myIdx)] ?? 0} –{" "}
                {lastResult.scores[String(myIdx === 0 ? 1 : 0)] ?? 0}
              </TypographyComponent>
            )}
            <View style={styles.nextQuestionBadge}>
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.secondary}
              >
                Suite dans {nextQuestionTimeLeft}s
              </TypographyComponent>
            </View>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gameContent}
        >
          <TypographyComponent
            variant="labelSmall"
            color={colors.text.tertiary}
          >
            Question {currentQuestion.number}
          </TypographyComponent>

          <View style={styles.timerContainer}>
            <View style={styles.timerHeader}>
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.secondary}
              >
                Temps restant
              </TypographyComponent>
              <TypographyComponent
                variant="h6"
                color={questionTimeLeft <= 3 ? colors.error : colors.primary}
              >
                {questionTimeLeft}s
              </TypographyComponent>
            </View>
            <View style={styles.timerTrack}>
              <View
                style={[
                  styles.timerFill,
                  {
                    width: `${timerProgress * 100}%`,
                    backgroundColor:
                      questionTimeLeft <= 3 ? colors.error : colors.primary,
                  },
                ]}
              />
            </View>
          </View>

          <TypographyComponent variant="h3" style={styles.questionText}>
            {currentQuestion.question}
          </TypographyComponent>

          <View style={styles.choicesContainer}>
            {currentQuestion.choices.map((choice, idx) => {
              const isSelected =
                lastResult !== null ? lastResult.my_answer === idx : false;
              const isCorrect = lastResult?.good_answer === idx;
              const isWrong =
                lastResult !== null &&
                lastResult.my_answer === idx &&
                lastResult.my_answer !== lastResult.good_answer;
              const choiceColor = isCorrect
                ? colors.success
                : isWrong
                  ? colors.error
                  : colors.text.tertiary;

              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.choiceButton,
                    isCorrect && styles.choiceCorrect,
                    isWrong && styles.choiceWrong,
                    answered &&
                      !lastResult &&
                      isSelected &&
                      styles.choiceSelected,
                    isQuestionLocked && !lastResult && styles.choiceDisabled,
                  ]}
                  onPress={() => sendAnswer(idx)}
                  disabled={isQuestionLocked}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.choiceIndex,
                      isCorrect && styles.choiceIndexCorrect,
                      isWrong && styles.choiceIndexWrong,
                    ]}
                  >
                    <TypographyComponent
                      variant="labelSmall"
                      color={choiceColor}
                    >
                      {String.fromCharCode(65 + idx)}
                    </TypographyComponent>
                  </View>
                  <TypographyComponent
                    variant="body"
                    color={
                      isCorrect || isWrong
                        ? colors.text.primary
                        : colors.text.primary
                    }
                    style={styles.choiceText}
                  >
                    {choice}
                  </TypographyComponent>
                </TouchableOpacity>
              );
            })}
          </View>

          {lastResult && (
            <View
              style={[
                styles.feedbackMessage,
                lastResult.my_answer === lastResult.good_answer
                  ? styles.feedbackMessageCorrect
                  : styles.feedbackMessageWrong,
              ]}
            >
              <Ionicons name={feedbackIcon} size={18} color={resultColor} />
              <TypographyComponent
                variant="label"
                color={resultColor}
                style={styles.feedbackText}
              >
                {feedbackMessage}
              </TypographyComponent>
            </View>
          )}

          {isQuestionLocked && !lastResult && (
            <View style={styles.waitingRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.tertiary}
                style={styles.ml8}
              >
                {questionTimeLeft === 0
                  ? "Temps écoulé, correction en cours..."
                  : "En attente de l'adversaire..."}
              </TypographyComponent>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  nextQuestionBadge: {
    marginLeft: "auto",
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  gameContent: {
    paddingTop: 24,
    paddingBottom: 32,
    gap: 8,
  },
  timerContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  timerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  timerTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border.light,
    overflow: "hidden",
  },
  timerFill: {
    height: "100%",
    borderRadius: 4,
  },
  questionText: {
    marginTop: 12,
    lineHeight: 30,
  },
  choicesContainer: {
    marginTop: 24,
    gap: 12,
  },
  choiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: colors.border.light,
  },
  choiceSelected: {
    borderColor: colors.primary,
  },
  choiceCorrect: {
    borderColor: "#86EFAC",
    backgroundColor: "#ECFDF3",
    shadowColor: colors.success,
    shadowOpacity: 0.16,
  },
  choiceWrong: {
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
    shadowColor: colors.error,
    shadowOpacity: 0.14,
  },
  choiceDisabled: {
    opacity: 0.7,
  },
  choiceIndex: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceIndexCorrect: {
    backgroundColor: "#D1FAE5",
  },
  choiceIndexWrong: {
    backgroundColor: "#FEE2E2",
  },
  choiceText: {
    flex: 1,
  },
  feedbackMessage: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  feedbackMessageCorrect: {
    backgroundColor: "#ECFDF3",
    borderColor: "#86EFAC",
  },
  feedbackMessageWrong: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  feedbackText: {
    flex: 1,
    marginLeft: 8,
  },
  waitingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  ml8: {
    marginLeft: 8,
  },
});

export default GameScreen;
