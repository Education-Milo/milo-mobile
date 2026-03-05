import { useEffect, useRef, useState } from "react";
import {
	useSharedValue,
	withSequence,
	withTiming,
	withSpring,
	SharedValue,
} from "react-native-reanimated";

export interface Question {
	id: number;
	question: string;
	options: string[];
	correctAnswer: string;
}

interface UseQCMScreenParams {
	questions: Question[];
	onQuizComplete: (score: number, totalTime: number) => void;
}

interface UseQCMScreenReturn {
	currentQuestionIndex: number;
	currentQuestion: Question | null;
	selectedAnswer: string | null;
	progress: number;
	score: number;
	streak: number;
	isErrorModalVisible: boolean;
	isSuccessModalVisible: boolean;
	currentCorrectAnswer: string;
	scaleAnims: SharedValue<number>[];
	handleAnswerSelect: (answer: string, index: number) => void;
	handleValidate: () => void;
	handleCloseErrorModal: () => void;
	handleCloseSuccessModal: () => void;
}

// Nombre max d'options — shared values créées une seule fois, jamais dynamiquement
const MAX_OPTIONS = 6;

const useQCMScreen = ({
	questions,
	onQuizComplete,
}: UseQCMScreenParams): UseQCMScreenReturn => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [progress, setProgress] = useState(0);
	const startTime = useRef(Date.now());
	const [score, setScore] = useState(0);
	const [streak, setStreak] = useState(0);

	const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState("");

	const currentQuestion = questions[currentQuestionIndex] ?? null;
	const optionCount = currentQuestion?.options.length ?? 0;

	const isAdvancing = useRef(false);

	// Les useSharedValue doivent être appelés inconditionnellement (règle des hooks)
	// On en crée MAX_OPTIONS et on slice selon le besoin au return
	const scale0 = useSharedValue(1);
	const scale1 = useSharedValue(1);
	const scale2 = useSharedValue(1);
	const scale3 = useSharedValue(1);
	const scale4 = useSharedValue(1);
	const scale5 = useSharedValue(1);
	const allScaleAnims = [scale0, scale1, scale2, scale3, scale4, scale5];

	useEffect(() => {
		if (questions.length === 0) return;
		setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
	}, [currentQuestionIndex, questions.length]);

	const handleAnswerSelect = (answer: string, index: number) => {
		setSelectedAnswer(answer);

		const anim = allScaleAnims[index];
		if (!anim) return;

		anim.value = withSequence(
			withTiming(0.95, { duration: 100 }),
			withSpring(1, { damping: 3, stiffness: 40 })
		);
	};

	const handleNextQuestion = (isCorrect: boolean) => {
		if (isAdvancing.current) return;
		isAdvancing.current = true;

		const newScore = isCorrect ? score + 1 : score;

		if (isCorrect) {
			setScore(newScore);
			setStreak((prev) => prev + 1);
		} else {
			setStreak(0);
		}

		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
			setSelectedAnswer(null);
			allScaleAnims.forEach((anim) => { anim.value = 1; });
			setTimeout(() => { isAdvancing.current = false; }, 300);
		} else {
			const timeTaken = Math.round((Date.now() - startTime.current) / 1000);
			onQuizComplete(newScore, timeTaken);
		}
	};

	const handleValidate = () => {
		if (!selectedAnswer || !currentQuestion) return;

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

	return {
		currentQuestionIndex,
		currentQuestion,
		selectedAnswer,
		progress,
		score,
		streak,
		isErrorModalVisible,
		isSuccessModalVisible,
		currentCorrectAnswer,
		scaleAnims: allScaleAnims.slice(0, optionCount),
		handleAnswerSelect,
		handleValidate,
		handleCloseErrorModal,
		handleCloseSuccessModal,
	};
};

export default useQCMScreen;