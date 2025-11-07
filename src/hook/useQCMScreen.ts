import { useState, useCallback } from 'react';

// Interfaces pour définir la structure des données
export interface Question {
    question: string;
    answers: string[];
    correct: number; // Index de la bonne réponse
}

// Données de questions
const initialQuestions: Question[] = [
    {
      question: "Quel est le résultat de 7 × 8 ?",
      answers: ["54", "56", "58", "64"],
      correct: 1
    },
    {
      question: "Combien font 144 ÷ 12 ?",
      answers: ["10", "11", "12", "13"],
      correct: 2
    },
    {
      question: "Quel est le nombre premier suivant : 11, 13, 17, ... ?",
      answers: ["18", "19", "20", "21"],
      correct: 1
    },
    {
      question: "Quelle est la valeur de 5² ?",
      answers: ["10", "15", "20", "25"],
      correct: 3
    },
    {
        question: "Quel est le résultat de 9 × 9 ?",
        answers: ["72", "81", "90", "99"],
        correct: 1
    },
];


export const useQuizLogic = () => {
    const [questions] = useState<Question[]>(initialQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [streak, setStreak] = useState<number>(0);
    
    // États pour les animations de gamification
    const [showStreakAnimation, setShowStreakAnimation] = useState<boolean>(false);
    const [showFireworks, setShowFireworks] = useState<boolean>(false);
    
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentQuestionIndex];

    const selectAnswer = useCallback((index: number) => {
        if (selectedAnswerIndex !== null) return;
        
        setSelectedAnswerIndex(index);
        
        const isCorrect = index === currentQuestion.correct;

        if (isCorrect) {
            setScore(s => s + 1);
            const newStreak = streak + 1;
            setStreak(newStreak);
            
            // Animation de Streak à partir de 3
            if (newStreak >= 3) {
                setShowStreakAnimation(true);
                setTimeout(() => setShowStreakAnimation(false), 2000);
            }
            
            // Animation de Feux d'artifice à partir de 5
            if (newStreak >= 5) {
                setShowFireworks(true);
                setTimeout(() => setShowFireworks(false), 3000);
            }
        } else {
            setStreak(0); // Réinitialiser la série
        }
    }, [currentQuestion, streak, selectedAnswerIndex]);
    
    
    const nextQuestion = useCallback(() => {
        if (currentQuestionIndex + 1 < totalQuestions) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswerIndex(null);
        } else {
            setShowResults(true);
        }
    }, [currentQuestionIndex, totalQuestions]);
    
    const restartQuiz = useCallback(() => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswerIndex(null);
        setShowResults(false);
        setStreak(0);
        setShowStreakAnimation(false);
        setShowFireworks(false);
    }, []);

    const getStreakMessage = useCallback((): string | null => {
        if (streak >= 5) return "🔥 EN FEU ! 🔥";
        if (streak >= 3) return "⚡ INCROYABLE ! ⚡";
        return null;
    }, [streak]);

    return {
        questions,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        score,
        selectedAnswerIndex,
        showResults,
        streak,
        showStreakAnimation,
        showFireworks,
        selectAnswer,
        nextQuestion,
        restartQuiz,
        getStreakMessage,
    };
};