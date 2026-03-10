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

type ChatScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
type ChatScreenRouteProp = RouteProp<AuthStackParamList, "ChatScreen">;

const useChatScreen = () => {
	// Navigation + params de la stack
	const navigation = useNavigation<ChatScreenNavigationProp>();
	const route = useRoute<ChatScreenRouteProp | any>();
	const { lessonId, lessonTitle, context } = route.params || {};

	// Référence pour l'auto-scroll de la liste
	const flatListRef = useRef<FlatList<Message> | null>(null);

	// Etat local du chat
	const [inputText, setInputText] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isTyping, setIsTyping] = useState(false); // Pour afficher "Milo est en train d'écrire..."

	// Récupération de l'action du store de cours
	// const generateLessonContent = useCourseStore(
	// 	(state) => state.generateLessonContent
	// );

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

	// ⚙️ Logique dynamique de démarrage de leçon (appel store + gestion erreurs)
	const startLesson = async () => {
		setIsTyping(true);
		try {
			// const response = await generateLessonContent(lessonId);
            const response = "Voici une introduction personnalisée pour ta leçon !";

			const introMessage: Message = {
				id: Date.now().toString(),
				text:`C'est parti pour le cours sur : ${lessonTitle} ! ${response}`,
				sender: "milo",
				timestamp: new Date(),
			};

			setMessages([introMessage]);
		} catch (error) {
			console.error("Erreur lancement cours", error);
			setMessages([
				{
					id: "error",
					text: "Oups, j'ai un petit souci pour récupérer ton cours. Réessaie plus tard !",
					sender: "milo",
					timestamp: new Date(),
				},
			]);
		} finally {
			setIsTyping(false);
		}
	};

	// 📨 Logique dynamique d'envoi de message
	// - Mise à jour optimiste de l'UI avec le message utilisateur
	// - Appel API au backend pour obtenir la réponse de Milo
	// - Gestion des erreurs réseau avec message explicite
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

		// actions
		sendMessage,

		// refs
		flatListRef,
	};
};

export default useChatScreen;
