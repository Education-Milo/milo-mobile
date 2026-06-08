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
	onQuizComplete: (score: number, totalTime: number, totalQuestions: number) => void;
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
	phase: QuizPhase;
	handleAnswerSelect: (answer: string, index: number) => void;
	handleValidate: () => void;
	handleCloseErrorModal: () => void;
	handleCloseSuccessModal: () => void;
}

const MAX_OPTIONS = 6;

type QuizPhase = 'normal' | 'retry' | 'result';

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
	const [phase, setPhase] = useState<QuizPhase>('normal');
	const [retryQueue, setRetryQueue] = useState<Question[]>([]);

	const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState("");

	const currentQuestion = phase === 'normal'
	? questions[currentQuestionIndex]
	: retryQueue[0] ?? null;
	const optionCount = currentQuestion?.options.length ?? 0;
	const totalQuestionsRef = useRef(questions.length);

	const isAdvancing = useRef(false);

	const scale0 = useSharedValue(1);
	const scale1 = useSharedValue(1);
	const scale2 = useSharedValue(1);
	const scale3 = useSharedValue(1);
	const scale4 = useSharedValue(1);
	const scale5 = useSharedValue(1);
	const allScaleAnims = [scale0, scale1, scale2, scale3, scale4, scale5];

	useEffect(() => {
		if (questions.length === 0) return;
		if (phase === 'normal') {
			setProgress(((currentQuestionIndex) / questions.length) * 100);
		} else {
			const answered = totalQuestionsRef.current - retryQueue.length;
    		setProgress((answered / totalQuestionsRef.current) * 100);
		}
	}, [currentQuestionIndex, retryQueue.length, phase]);

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
			setStreak(prev => prev + 1);
		} else {
			setStreak(0);
		}

		if (phase === 'normal') {
			if(!isCorrect) setRetryQueue((prev) => [...prev, currentQuestion!]);
			if(currentQuestionIndex < questions.length - 1) {
				setCurrentQuestionIndex((prev) => prev + 1);
				setSelectedAnswer(null);
			} else {
				if (retryQueue.length > 0 || !isCorrect) {
					totalQuestionsRef.current = questions.length + retryQueue.length + (!isCorrect ? 1 : 0);
					setPhase('retry');
				} else {
					const timeTaken = Math.round((Date.now() - startTime.current) / 1000);
					onQuizComplete(newScore, timeTaken, totalQuestionsRef.current);
				}
			}
		} else {
			if (isCorrect) {
				const updateQueue = retryQueue.slice(1);
				setRetryQueue(updateQueue);
				if (updateQueue.length === 0) {
					const timeTaken = Math.round((Date.now() - startTime.current) / 1000);
					onQuizComplete(newScore, timeTaken, totalQuestionsRef.current);
				}
			} else {
				setRetryQueue(prev => [...prev.slice(1), prev[0]]);
			}
		}
		setSelectedAnswer(null);
		allScaleAnims.forEach(anim => (anim.value = 1));
		setTimeout(() => { isAdvancing.current = false; }, 300);
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
		phase,
	};
};

export default useQCMScreen;