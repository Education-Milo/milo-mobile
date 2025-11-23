import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Send } from 'lucide-react-native';

import TypographyComponent from '@components/Typography.component';
import Layout from '@components/Layout';
import { colors } from '@theme/colors';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { useCourseStore } from '@store/course/course.store';
import APIAxios from '@api/axios.api';

// TYPES
type ChatScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
type ChatScreenRouteProp = RouteProp<AuthStackParamList, 'ChatScreen'>;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'milo';
  timestamp: Date;
}

const ChatScreen = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  // On utilise 'any' ici temporairement si ton AuthStackParamList n'est pas encore mis à jour avec les params
  const route = useRoute<any>(); 
  const { lessonId, lessonTitle, context } = route.params || {};

  const flatListRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false); // Pour l'effet "Milo écrit..."

  // ✅ RECUPERATION DE L'ACTION DU STORE
  const generateLessonContent = useCourseStore((state) => state.generateLessonContent);

  // 1️⃣ INITIALISATION DU COURS
  useEffect(() => {
    if (lessonId && messages.length === 0) {
      startLesson();
    } else if (!lessonId && messages.length === 0) {
        // Cas par défaut (si on ouvre le chat sans leçon, ex: juste parler à Milo)
        setMessages([{
            id: 'welcome',
            text: "Salut ! Je suis Milo. Je suis là pour t'aider dans tes devoirs. De quoi veux-tu parler ?",
            sender: 'milo',
            timestamp: new Date()
        }]);
    }
  }, [lessonId]);

  const startLesson = async () => {
    setIsTyping(true);
    try {
      // On appelle le store pour générer l'intro du cours
      // Si le store renvoie un objet complexe, adapte 'response.content' selon ton retour API
      const response = await generateLessonContent(lessonId);
      
      const introMessage: Message = {
        id: Date.now().toString(),
        text: response.content || `C'est parti pour le cours sur : ${lessonTitle} ! ${response}`, // Fallback
        sender: 'milo',
        timestamp: new Date()
      };
      
      setMessages([introMessage]);
    } catch (error) {
      console.error("Erreur lancement cours", error);
      setMessages([{
        id: 'error',
        text: "Oups, j'ai un petit souci pour récupérer ton cours. Réessaie plus tard !",
        sender: 'milo',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // 2️⃣ ENVOI DE MESSAGE ET INTERACTIVITÉ
  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    const userMsgText = inputText;
    setInputText(''); // Reset input direct

    // A. Affiche le message de l'utilisateur (Optimistic UI)
    const userMsg: Message = { 
        id: Date.now().toString(), 
        text: userMsgText, 
        sender: 'user', 
        timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true); // Milo réfléchit...

    try {
      // B. Appel API pour la réponse interactive
      // On envoie le texte + l'ID de la leçon pour garder le contexte pédagogique
      const response = await APIAxios.post('/chat/message', {
        text: userMsgText,
        lessonId: lessonId, // IMPORTANT : Le contexte
        context: context    // Optionnel : contexte supplémentaire
      });

      // C. Affiche la réponse de Milo
      const miloMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: response.data.reply || response.data.content || "Je n'ai pas compris, peux-tu répéter ?", 
        sender: 'milo', 
        timestamp: new Date() 
      };
      
      setMessages(prev => [...prev, miloMsg]);

    } catch (error) {
      console.error("Erreur chat", error);
      // Feedback visuel en cas d'erreur
      setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "Désolé, je n'arrive pas à me connecter au serveur pour le moment.",
          sender: 'milo',
          timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- RENDER ITEMS ---

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isMilo = item.sender === 'milo';
    return (
      <View style={[
        styles.messageContainer, 
        isMilo ? styles.miloMessageContainer : styles.userMessageContainer
      ]}>
        {isMilo && (
          <View style={styles.avatarSmallContainer}>
             <Image 
                source={require('../../assets/images/mascot.png')} 
                style={styles.avatarSmall} 
                resizeMode="contain"
            />
          </View>
        )}
        <View style={[styles.messageBubble, isMilo ? styles.miloBubble : styles.userBubble]}>
          <TypographyComponent 
            variant="body" 
            color={isMilo ? colors.text.primary : '#FFFFFF'}
          >
            {item.text}
          </TypographyComponent>
        </View>
      </View>
    );
  };

  return (
    <Layout>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <TypographyComponent variant="h6">
              {lessonTitle ? `Cours : ${lessonTitle}` : 'Discussion avec Milo'}
            </TypographyComponent>
            <TypographyComponent variant="labelSmall" color="green">
              En ligne
            </TypographyComponent>
          </View>
        </View>

        {/* LISTE DES MESSAGES */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={
              isTyping ? (
                  <View style={{ padding: 10, marginLeft: 40 }}>
                      <TypographyComponent variant="labelSmall" color={colors.text.secondary}>
                          Milo est en train d'écrire...
                      </TypographyComponent>
                  </View>
              ) : null
          }
        />

        {/* INPUT BAR */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Pose ta question ou réponds..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
                style={[styles.sendButton, { backgroundColor: inputText.length > 0 ? colors.primary : '#E5E7EB' }]} 
                onPress={sendMessage}
                disabled={inputText.length === 0}
            >
              <Send size={20} color={inputText.length > 0 ? '#FFFFFF' : '#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1', // Background clair comme les autres écrans
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '85%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  miloMessageContainer: {
    alignSelf: 'flex-start',
  },
  avatarSmallContainer: {
    marginRight: 8,
    marginBottom: 4,
  },
  avatarSmall: {
    width: 32,
    height: 32,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: colors.primary, // Orange Milo
    borderBottomRightRadius: 4,
  },
  miloBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderBottomLeftRadius: 4,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    color: '#1F2937',
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;