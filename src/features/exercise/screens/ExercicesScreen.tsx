import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QCMScreen from "@features/exercise/screens/QCMScreen";
import QCMResultsScreen from "@features/exercise/screens/QCMResultsScreen";
import useExerciseScreen from "@features/exercise/hooks/useExerciseScreen";
import LoadingScreen from "@shared/components/LoadingScreen";

const ExercicesScreen = () => {
	const {
		questions,
		loading,
		error,
		showResultsScreen,
		score,
		totalTime,
		handleQuizComplete,
		handleQuit,
		handleRestartQuiz,
		handleBackToHome,
		scorePercentage,
	} = useExerciseScreen();

	if (loading) {
		return <LoadingScreen />;
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
				score={scorePercentage}
				finalScore={score}
				totalQuestions={questions.length}
				totalTime={totalTime}
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
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "red",
		fontSize: 16,
	},
});

export default ExercicesScreen;
