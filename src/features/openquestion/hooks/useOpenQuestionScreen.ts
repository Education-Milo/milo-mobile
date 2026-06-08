import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@app/navigation/Auth/authNavigator.model";
import { useKeyboardState } from "@shared/hooks/useKeyboardState";
import { sendOpenQuestionChatMessage } from "@features/openquestion/api/openQuestion.api";
import { useUserStore } from "@features/user/store/user.store";

export type OpenQuestionPhase =
  | "loading"
  | "answering"
  | "submitted"
  | "helping"
  | "feedback";

export type OpenQuestionInputMode = "answer" | "help";

export type OpenQuestionMessage = {
  id: string;
  type: "question" | "user_answer" | "help_request" | "feedback" | "help";
  text: string;
};

type OpenQuestionScreenRouteProp = RouteProp<
  AuthStackParamList,
  "OpenQuestionScreen"
>;
type OpenQuestionScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const getUserDisplayName = (
  user: ReturnType<typeof useUserStore.getState>["user"],
) => {
  if (!user) return "l'élève";

  return (
    `${user.first_name ?? ""}`.trim() ||
    user.username ||
    "l'élève"
  );
};

const buildGeneratePrompt = (context: string, studentName: string) =>
  `Tu es un professeur bienveillant. 
Génère UNE SEULE question ouverte de réflexion sur le thème suivant : "${context}".
La question doit être précise, pédagogique et adaptée à un collégien.
L'élève s'appelle "${studentName}".
Continue la conversation en cours sans saluer l'élève.
Ne commence jamais par "Bonjour", "Salut" ou "Bonjour toi".
Réponds UNIQUEMENT avec la question, sans introduction ni numérotation.`;

const buildFeedbackPrompt = (
  question: string,
  answer: string,
  context: string,
  studentName: string,
) =>
  `Tu es un professeur bienveillant qui corrige une réponse d'élève.

Notion : "${context}"
Question : "${question}"
Réponse de l'élève : "${answer}"

Donne un retour constructif et encourageant en 3 parties :
1. Ce qui est bien dans la réponse
2. Ce qui pourrait être amélioré ou complété
3. Une reformulation idéale courte de la bonne réponse

Continue la conversation en cours sans saluer l'élève.
Ne commence jamais par "Bonjour", "Salut" ou "Bonjour toi".
Sois chaleureux, bref et pédagogique. L'élève s'appelle "${studentName}".`;

const buildHelpPrompt = (
  question: string,
  helpRequest: string,
  context: string,
  studentName: string,
) =>
  `Tu es un professeur bienveillant qui aide un élève sans donner directement toute la réponse.

Notion : "${context}"
Question ouverte actuelle : "${question}"
Demande de l'élève : "${helpRequest}"

L'élève s'appelle "${studentName}".
Réponds à sa demande avec une aide courte, claire et progressive.
Donne un indice, une reformulation ou une piste de réflexion, mais ne rédige pas la réponse complète à sa place.
Continue la conversation en cours sans saluer l'élève.
Ne commence jamais par "Bonjour", "Salut" ou "Bonjour toi".`;

const createMessage = (
  type: OpenQuestionMessage["type"],
  text: string,
): OpenQuestionMessage => ({
  id: Date.now().toString(),
  type,
  text,
});

export const useOpenQuestionScreen = () => {
  const navigation = useNavigation<OpenQuestionScreenNavigationProp>();
  const route = useRoute<OpenQuestionScreenRouteProp>();
  const user = useUserStore((state) => state.user);
  const { lessonTitle, context, conversationId: initialConversationId } =
    route.params || {};
  const lessonContext = context || lessonTitle || "la notion";
  const studentName = getUserDisplayName(user);

  const { isFieldFocused, handleFocus, handleBlur } = useKeyboardState();
  const flatListRef = useRef<FlatList<OpenQuestionMessage> | null>(null);

  const [messages, setMessages] = useState<OpenQuestionMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputMode, setInputMode] =
    useState<OpenQuestionInputMode>("answer");
  const [phase, setPhase] = useState<OpenQuestionPhase>("loading");
  const [questionCount, setQuestionCount] = useState(0);
  const [conversationId, setConversationId] = useState(
    initialConversationId ?? "",
  );

  const generateQuestion = async () => {
    setPhase("loading");

    try {
      const data = await sendOpenQuestionChatMessage({
        chatRequest: buildGeneratePrompt(lessonContext, studentName),
        conversationId,
      });

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      setCurrentQuestion(data.text);
      setMessages((prev) => [...prev, createMessage("question", data.text)]);
      setInputMode("answer");
      setPhase("answering");
    } catch (err) {
      console.error("Erreur génération question", err);
      setMessages((prev) => [
        ...prev,
        createMessage(
          "feedback",
          "Désolé, je n'arrive pas à générer une question pour le moment.",
        ),
      ]);
      setPhase("answering");
    }
  };

  const submitAnswer = async () => {
    if (inputText.trim().length === 0) return;

    const answerText = inputText.trim();
    setInputText("");
    setMessages((prev) => [
      ...prev,
      createMessage("user_answer", answerText),
    ]);
    setPhase("submitted");

    try {
      const data = await sendOpenQuestionChatMessage({
        chatRequest: buildFeedbackPrompt(
          currentQuestion,
          answerText,
          lessonContext,
          studentName,
        ),
        conversationId,
      });

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages((prev) => [...prev, createMessage("feedback", data.text)]);
      setQuestionCount((current) => current + 1);
      setPhase("feedback");
    } catch (err) {
      console.error("Erreur correction", err);
      setMessages((prev) => [
        ...prev,
        createMessage(
          "feedback",
          "Désolé, je n'arrive pas à corriger ta réponse pour le moment.",
        ),
      ]);
      setPhase("feedback");
    }
  };

  const requestHelp = async () => {
    if (inputText.trim().length === 0) return;

    const helpRequest = inputText.trim();
    setInputText("");
    setMessages((prev) => [
      ...prev,
      createMessage("help_request", helpRequest),
    ]);
    setPhase("helping");

    try {
      const data = await sendOpenQuestionChatMessage({
        chatRequest: buildHelpPrompt(
          currentQuestion,
          helpRequest,
          lessonContext,
          studentName,
        ),
        conversationId,
      });

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages((prev) => [...prev, createMessage("help", data.text)]);
      setPhase("answering");
      setInputMode("answer");
    } catch (err) {
      console.error("Erreur demande d'aide", err);
      setMessages((prev) => [
        ...prev,
        createMessage(
          "help",
          "Désolé, je n'arrive pas à donner un indice pour le moment.",
        ),
      ]);
      setPhase("answering");
    }
  };

  const submitInput = () => {
    if (inputMode === "help") {
      requestHelp();
      return;
    }

    submitAnswer();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return {
    navigation,
    lessonTitle,
    isFieldFocused,
    handleFocus,
    handleBlur,
    flatListRef,
    messages,
    inputText,
    setInputText,
    inputMode,
    setInputMode,
    phase,
    questionCount,
    generateQuestion,
    submitInput,
    isInputEnabled: phase === "answering",
  };
};
