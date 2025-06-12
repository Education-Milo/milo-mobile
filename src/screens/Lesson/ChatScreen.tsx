import React, { useState, useRef, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';
import { RootStackParamList } from '@navigation/types';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '@constants/Colors';
import Typography from '@components/Typography.component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextFieldComponent from '@components/TextField.component';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LessonScreenProps {
  navigation: NavigationProp;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function LessonScreen({ navigation }: LessonScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour Alex ! 🦊 Je serais ravi de t\'aider avec tes équations. Peux-tu me dire quel type d\'équations tu étudies ? Du premier degré, du second degré ?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulation d'appel API - remplacez par votre vraie API
      const response = await simulateApiCall(inputText.trim());
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'envoyer le message. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de simulation - remplacez par votre vraie API
  const simulateApiCall = async (message: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          'Parfait ! Le discriminant est un outil puissant. Commençons par les bases : pour une équation ax² + bx + c = 0, le discriminant Δ = b² - 4ac. Veux-tu qu\'on fasse un exercice ensemble ?',
          'C\'est une excellente question ! Pouvez-vous me donner plus de détails ?',
          'Je comprends votre point de vue. Voici ce que je peux vous expliquer...',
          'Intéressant ! Cela me fait penser à un concept important.',
          'C\'est un sujet complexe. Commençons par les bases.',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
      }, 1000 + Math.random() * 2000);
    });
  };

  const renderMessage = (message: Message) => (
    <View key={message.id} style={chatStyles.messageWrapper}>
      {message.isUser ? (
        // Message utilisateur (bulle orange à droite)
        <View style={chatStyles.userMessageContainer}>
          <View style={chatStyles.userBubble}>
            <Typography variant="body" color="#FFFFFF" style={chatStyles.messageText}>
              {message.text}
            </Typography>
          </View>
          <Typography variant="labelSmall" color="#999999" style={chatStyles.userTimestamp}>
            {message.timestamp.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </View>
      ) : (
        // Message bot (avatar + texte à gauche)
        <View style={chatStyles.botMessageContainer}>
          <View style={chatStyles.botContentContainer}>
            <Text style={chatStyles.foxEmoji}>🦊</Text>
            <View style={chatStyles.botTextContainer}>
              <Typography variant="body" color="#333333" style={chatStyles.messageText}>
                {message.text}
              </Typography>
            </View>
          </View>
          <Typography variant="labelSmall" color="#999999" style={chatStyles.botTimestamp}>
            {message.timestamp.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </View>
      )}
    </View>
  );

  return (
    <Layout navigation={navigation}>
      <KeyboardAvoidingView 
        style={{flex: 1, backgroundColor: '#FFFFFF'}} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={chatStyles.messagesContainer}
          contentContainerStyle={chatStyles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          {isLoading && (
            <View style={chatStyles.messageWrapper}>
              <View style={chatStyles.botMessageContainer}>
                <View style={chatStyles.botContentContainer}>
                  <Text style={chatStyles.foxEmoji}>🦊</Text>
                  <View style={chatStyles.botTextContainer}>
                    <Typography variant="body" color="#333333">
                      En train d'écrire...
                    </Typography>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Zone de saisie */}
        <View style={chatStyles.inputContainer}>
          <View style={chatStyles.inputWrapper}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Écris ton message à Milo..."
              placeholderTextColor="#CCCCCC"
              multiline
              maxLength={1000}
              style={chatStyles.textInput}
            />
            {inputText.trim() && (
              <TouchableOpacity 
                style={chatStyles.sendButton} 
                onPress={sendMessage}
                disabled={isLoading}
              >
                <Ionicons 
                  name="send" 
                  size={20} 
                  color="#FF7A5C"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const chatStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end' as const,
    marginLeft: 60,
  },
  userBubble: {
    backgroundColor: '#FF7A5C',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    maxWidth: '85%' as const,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userTimestamp: {
    fontSize: 11,
    marginRight: 8,
    color: '#8E8E93',
  },
  botMessageContainer: {
    alignItems: 'flex-start' as const,
    marginRight: 60,
  },
  botContentContainer: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    maxWidth: '100%' as const,
    marginBottom: 4,
  },
  foxEmoji: {
    fontSize: 28,
    marginRight: 12,
    marginTop: 2,
  },
  botTextContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  botTimestamp: {
    fontSize: 11,
    marginLeft: 44,
    color: '#8E8E93',
  },
  messageText: {
    lineHeight: 22,
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  inputWrapper: {
    flexDirection: 'row' as const,
    alignItems: 'flex-end' as const,
    backgroundColor: '#F2F2F7',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    minHeight: 34,
    textAlignVertical: 'center',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
};

export default LessonScreen;