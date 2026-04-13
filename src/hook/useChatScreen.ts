import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import APIAxios from "@api/axios.api";
import { AuthStackParamList } from "@navigation/Auth/authNavigator.model";

// TYPES PARTAGÉS AVEC L'ÉCRAN
export type Message = {
	id: string;
	text: string;
	sender: "user" | "milo";
	timestamp: Date;
};

export type LessonPart = {
	id: string;
	title: string;
	content: string;
}

export type ChatPhase = 'explaining' | 'waiting_question' | 'answering';

type ChatScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
type ChatScreenRouteProp = RouteProp<AuthStackParamList, "ChatScreen">;


const MOCK_PARTS: LessonPart[] = [
	{ id: '1', title: 'Introduction', content: 'Voici la première partie...' },
	{ id: '2', title: 'Développement', content: 'Voici la deuxième partie...' },
	{ id: '3', title: 'Conclusion', content: 'Voici la troisième partie...' },
];

const useChatScreen = () => {

	const [parts, setParts] = useState<LessonPart[]>([]); // parties de la leçon
	const [currentPartIndex, setCurrentPartIndex] = useState(0);
	const [phase, setPhase] = useState<ChatPhase>('explaining');
	// Navigation + params de la stack
	const navigation = useNavigation<ChatScreenNavigationProp>();
	const route = useRoute<ChatScreenRouteProp | any>();
	const { lessonId, lessonTitle, context } = route.params || {};

	// Référence pour l'auto-scroll de la liste
	const flatListRef = useRef<FlatList<Message> | null>(null);

	// Etat local du chat
	const [inputText, setInputText] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isTyping, setIsTyping] = useState(false);


	// 🔁 Logique dynamique d'initialisation du chat
	// - Si une leçon est présente, on déclenche la génération de l'intro via le store
	// - Sinon, on affiche un message d'accueil générique
	useEffect(() => {
		if (lessonId && messages.length === 0) {
			startLesson();
		} else if (!lessonId && messages.length === 0) {
			setMessages([
				{
					id: "welcome",
					text: "Salut ! Je suis Milo. Je suis là pour t'aider dans tes devoirs. De quoi veux-tu parler ?",
					sender: "milo",
					timestamp: new Date(),
				},
			]);
		}
		// On dépend de lessonId et de la longueur de la liste pour ne lancer qu'une fois l'init
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lessonId, messages.length]);

	const startLesson = async () => {
		setIsTyping(true);
		try {
			// TODO: remplacer par l'appel API quand le back sera prêt
			// const response = await APIAxios.get(`/lessons/${lessonId}/parts`);
			const lessonParts = MOCK_PARTS;
			setParts(lessonParts);

			const firstPart = lessonParts[0];
			setMessages([{
			id: Date.now().toString(),
			text: firstPart.content,
			sender: 'milo',
			timestamp: new Date(),
			}]);
			setPhase('waiting_question');
		} catch (error) {
			// gestion erreur existante
		} finally {
			setIsTyping(false);
		}
	};

	const goToNextPart = () => {
		const nextIndex = currentPartIndex + 1;
		if (nextIndex >= parts.length) {
			// leçon terminée
			setMessages(prev => [...prev, {
			id: Date.now().toString(),
			text: 'Bravo ! Tu as terminé toutes les parties de cette leçon ! 🎉',
			sender: 'milo',
			timestamp: new Date(),
			}]);
			setTimeout(() => navigation.goBack(), 2000);
			return;
		}
		setCurrentPartIndex(nextIndex);
		setPhase('explaining');
		setIsTyping(true);
		setTimeout(() => {
			setMessages(prev => [...prev, {
				id: Date.now().toString(),
				text: parts[nextIndex].content,
				sender: 'milo',
				timestamp: new Date(),
			}]);
			setIsTyping(false);
			setPhase('waiting_question');
		}, 1000);
	};

	const sendMessage = async () => {
		if (inputText.trim().length === 0) return;

		const userMsgText = inputText;
		setInputText("");

		const userMsg: Message = {
			id: Date.now().toString(),
			text: userMsgText,
			sender: "user",
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMsg]);
		setIsTyping(true);

		try {
			const response = await APIAxios.post("/chat/message", {
				text: userMsgText,
				lessonId: lessonId,
				context: context,
			});

			const miloMsg: Message = {
				id: (Date.now() + 1).toString(),
				text:
					response.data?.reply ||
					response.data?.content ||
					"Je n'ai pas compris, peux-tu répéter ?",
				sender: "milo",
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, miloMsg]);
		} catch (error) {
			console.error("Erreur chat", error);
			setMessages((prev) => [
				...prev,
				{
					id: Date.now().toString(),
					text: "Désolé, je n'arrive pas à me connecter au serveur pour le moment.",
					sender: "milo",
					timestamp: new Date(),
				},
			]);
		} finally {
			setIsTyping(false);
		}
	};

	return {
		// navigation / infos d'écran
		navigation,
		lessonTitle,

		// état du chat
		messages,
		isTyping,
		inputText,
		setInputText,

		parts,
		currentPartIndex,
		phase,
		goToNextPart,

		// actions
		sendMessage,

		// refs
		flatListRef,
	};
};

export default useChatScreen;
