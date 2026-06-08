import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LessonPart } from "@features/course/store/course.model";
import { AuthStackParamList } from "@app/navigation/Auth/authNavigator.model";
import { fetchLessonParts, sendChatMessage } from "@features/course/api/course.queries";
import { sendDocumentChatMessage } from "@features/ocr/api/ocr.api";

// TYPES PARTAGÉS AVEC L'ÉCRAN
export type Message = {
  id: string;
  text: string;
  sender: "user" | "milo";
  timestamp: Date;
};

export type ChatPhase = "explaining" | "waiting_question" | "answering" | "lesson_complete";

type ChatScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
type ChatScreenRouteProp = RouteProp<AuthStackParamList, "ChatScreen">;

const useChatScreen = () => {
  const [parts, setParts] = useState<LessonPart[]>([]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [phase, setPhase] = useState<ChatPhase>("explaining");

  const navigation = useNavigation<ChatScreenNavigationProp>();
  const route = useRoute<ChatScreenRouteProp>();
  const {
    lessonId,
    lessonTitle,
    context,
    conversationId: initialConversationId,
    initialMessage,
  } = route.params || {};

  const flatListRef = useRef<FlatList<Message> | null>(null);

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(
    initialConversationId ?? "",
  );

  const isLessonChat = Boolean(lessonId);

  const extractReplyText = (data: any) =>
    String(data?.reply ?? data?.content ?? data?.message ?? "");

  const extractConversationId = (data: any) =>
    String(data?.conversation_id ?? data?.conversationId ?? "");

  useEffect(() => {
    if (lessonId && messages.length === 0) {
      startLesson();
    } else if (!lessonId && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text:
            initialMessage ||
            "Salut ! Je suis Milo. Je suis là pour t'aider dans tes devoirs. De quoi veux-tu parler ?",
          sender: "milo",
          timestamp: new Date(),
        },
      ]);
      setPhase("waiting_question");
    }
  }, [initialMessage, lessonId, messages.length]);

  const startLesson = async () => {
    if (!lessonId) return;

    setIsTyping(true);
    try {
      const response = await fetchLessonParts(Number(lessonId), context);
      const lessonParts: LessonPart[] = response.parts;
      if (response.conversationId) {
        setConversationId(response.conversationId);
      }

      setParts(lessonParts);
      setMessages([
        {
          id: Date.now().toString(),
          text: lessonParts[0].content,
          sender: "milo",
          timestamp: new Date(),
        },
      ]);
      setPhase("waiting_question");
    } catch (error) {
      console.error("Erreur lors du chargement de la leçon", error);
      setMessages([
        {
          id: Date.now().toString(),
          text: "Désolé, je n'arrive pas à charger la leçon pour le moment.",
          sender: "milo",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const goToNextPart = () => {
    const nextIndex = currentPartIndex + 1;

    // Leçon terminée → on passe en mode "lesson_complete"
    if (nextIndex >= parts.length) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Bravo ! Tu as terminé toutes les parties de cette leçon ! 🎉 Comment veux-tu continuer ?",
          sender: "milo",
          timestamp: new Date(),
        },
      ]);
      setPhase("lesson_complete");
      return;
    }

    setCurrentPartIndex(nextIndex);
    setPhase("explaining");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: parts[nextIndex].content,
          sender: "milo",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
      setPhase("waiting_question");
    }, 1000);
  };

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    const userMsgText = inputText;
    const currentPartContent = parts[currentPartIndex]?.content || "";
    setInputText("");

    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMsgText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setPhase("answering");

    try {
      let replyText = "";

      if (isLessonChat) {
        const response = await sendChatMessage(
          currentPartContent,
          userMsgText,
          conversationId,
        );
        replyText = response.text;

        if (response.conversationId) {
          setConversationId(response.conversationId);
        }
      } else {
        const response = await sendDocumentChatMessage({
          chatRequest: userMsgText,
          context,
          conversationId,
        });
        replyText = extractReplyText(response);

        const nextConversationId = extractConversationId(response);
        if (nextConversationId) {
          setConversationId(nextConversationId);
        }
      }

      const miloMsg: Message = {
        id: (Date.now() + 1).toString(),
        text:
          replyText ||
          "J'ai bien reçu ta question, mais je n'ai pas réussi à formuler une réponse.",
        sender: "milo",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, miloMsg]);
      setPhase("waiting_question");
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

  // Actions de fin de leçon
  const handleGoToQCM = () => {
    if (!lessonId) return;

    navigation.navigate("ExercicesScreen", { lessonId });
  };

  const handleGoToOpenQuestion = () => {
    const params: AuthStackParamList["OpenQuestionScreen"] = {};

    if (lessonId) params.lessonId = lessonId;
    if (lessonTitle) params.lessonTitle = lessonTitle;
    if (context || lessonTitle) params.context = context || lessonTitle;
    if (conversationId) params.conversationId = conversationId;

    navigation.navigate("OpenQuestionScreen", params);
  };

  const handleGoBackToChapters = () => {
    if (context) {
      navigation.navigate("LessonChapter", { matiere: context });
      return;
    }

    navigation.navigate("Lessons");
  };

  return {
    // navigation / infos d'écran
    navigation,
    lessonTitle,
    lessonId,

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

    // actions fin de leçon
    handleGoToQCM,
    handleGoToOpenQuestion,
    handleGoBackToChapters,

    // refs
    flatListRef,
  };
};

export default useChatScreen;
