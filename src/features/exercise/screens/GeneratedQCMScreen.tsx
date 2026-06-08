import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import QCMScreen from "@features/exercise/screens/QCMScreen";
import QCMResultsScreen from "@features/exercise/screens/QCMResultsScreen";
import { Question } from "@features/exercise/hooks/useQCMScreen";
import { AuthStackParamList } from "@app/navigation/Auth/authNavigator.model";
import { colors } from "@shared/theme/colors";

type GeneratedQCMRouteProp = RouteProp<
  AuthStackParamList,
  "GeneratedQCMScreen"
>;

type GeneratedQCMNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const getCorrectAnswer = (
  question: AuthStackParamList["GeneratedQCMScreen"]["questions"][number],
) => question.correctAnswer ?? question.correct_answer ?? question.answer ?? "";

const mapGeneratedQuestion = (
  question: AuthStackParamList["GeneratedQCMScreen"]["questions"][number],
  index: number,
): Question => ({
  id: question.id ?? index + 1,
  question: question.question,
  options: question.options,
  correctAnswer: getCorrectAnswer(question),
});

const GeneratedQCMScreen = () => {
  const navigation = useNavigation<GeneratedQCMNavigationProp>();
  const route = useRoute<GeneratedQCMRouteProp>();
  const questions = useMemo(
    () =>
      route.params.questions
        .map(mapGeneratedQuestion)
        .filter(
          (question) =>
            question.question.trim().length > 0 &&
            question.options.length > 0 &&
            question.correctAnswer.trim().length > 0,
        ),
    [route.params.questions],
  );
  const [showResultsScreen, setShowResultsScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(questions.length);

  const scorePercentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const handleQuizComplete = (
    finalScore: number,
    timeTaken: number,
    total: number,
  ) => {
    setScore(finalScore);
    setTotalTime(timeTaken);
    setTotalQuestions(total);
    setShowResultsScreen(true);
  };

  const handleRestartQuiz = () => {
    setScore(0);
    setTotalTime(0);
    setTotalQuestions(questions.length);
    setShowResultsScreen(false);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="help-circle-outline" size={52} color={colors.primary} />
        <Text style={styles.emptyTitle}>QCM indisponible</Text>
        <Text style={styles.emptyText}>
          Milo n'a pas pu récupérer les questions du QCM généré.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showResultsScreen) {
    return (
      <QCMResultsScreen
        score={scorePercentage}
        finalScore={score}
        totalQuestions={totalQuestions}
        totalTime={totalTime}
        onRestart={handleRestartQuiz}
        onBackToHome={() => navigation.navigate("HomeTabs")}
      />
    );
  }

  return (
    <QCMScreen
      questions={questions}
      onQuizComplete={handleQuizComplete}
      onQuit={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    marginTop: 14,
    color: colors.text.primary,
    fontSize: 22,
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 8,
    color: colors.text.secondary,
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  backButton: {
    marginTop: 22,
    borderRadius: 18,
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 13,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default GeneratedQCMScreen;
