import { useEffect, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { QcmQuestion } from "@store/exercise/exercise.model";
import { useExerciseStore } from "@store/exercise/exercise.store";

export interface Question {
	id: number;
	question: string;
	options: string[];
	correctAnswer: string;
}

interface UseExerciseScreenReturn {
	questions: Question[];
	loading: boolean;
	error: string | null;
	showResultsScreen: boolean;
	score: number;
	totalTime: number;
	xpEarned: number;
	handleQuizComplete: (finalScore: number, timeTaken: number) => void;
	handleQuit: () => void;
	handleRestartQuiz: () => void;
	handleBackToHome: () => void;
}

// Convertit le format API vers le format local utilisé par QCMScreen
const mapToQuestion = (q: QcmQuestion, index: number): Question => ({
	id: index + 1,
	question: q.question,
	options: q.options,
	correctAnswer: q.correct_answer,
});

const useExerciseScreen = (): UseExerciseScreenReturn => {
	const navigation = useNavigation<NativeStackNavigationProp<any>>();
	const route = useRoute<RouteProp<{ params: { lessonId: string } }, "params">>();
	const lessonId = Number(route.params?.lessonId);

	const { generate_qcm_lesson, loading, error } = useExerciseStore();

	const [questions, setQuestions] = useState<Question[]>([]);
	const [showResultsScreen, setShowResultsScreen] = useState(false);
	const [score, setScore] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [xpEarned, setXpEarned] = useState(0);

	useEffect(() => {
		const fetchQuestions = async () => {
			if (!lessonId) return;
			const qcmQuestions = await generate_qcm_lesson(lessonId);
			setQuestions(qcmQuestions.map(mapToQuestion));
		};

		fetchQuestions();
	}, [lessonId]);

	useEffect(() => {
		if (showResultsScreen && questions.length > 0) {
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

	const handleRestartQuiz = async () => {
		setShowResultsScreen(false);
		setScore(0);
		setTotalTime(0);
		setXpEarned(0);
		if (lessonId) {
			const qcmQuestions = await generate_qcm_lesson(lessonId);
			setQuestions(qcmQuestions.map(mapToQuestion));
		}
	};

	const handleBackToHome = () => {
		navigation.goBack();
	};

	return {
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
	};
};

export default useExerciseScreen;