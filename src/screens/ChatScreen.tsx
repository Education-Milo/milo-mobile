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
  SafeAreaView
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Send, MoreVertical, Phone, Video } from 'lucide-react-native';

// Imports internes
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';

// Types
type ChatScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
// type ChatScreenRouteProp = RouteProp<AuthStackParamList, 'ChatScreen'>;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'milo';
  timestamp: Date;
}

const ChatScreen = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  // Récupération des paramètres (leçon, matière...) si nécessaire
  // const route = useRoute<ChatScreenRouteProp>(); 
  
  const flatListRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState('');
  
  // État initial avec un message de bienvenue de Milo
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis Milo. Prêt à travailler sur ton cours ? Pose-moi tes questions !",
      sender: 'milo',
      timestamp: new Date(),
    }
  ]);

  // Fonction pour envoyer un message
  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Simulation de réponse de Milo (à remplacer par l'appel API réel)
    setTimeout(() => {
      const miloResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "C'est noté ! Je vais t'aider avec ça. Peux-tu préciser ta demande ?",
        sender: 'milo',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, miloResponse]);
    }, 1500);
  };

  // Scroll automatique vers le bas lors d'un nouveau message
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  // Rendu d'un message individuel
  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[
        styles.messageContainer, 
        isUser ? styles.userMessageContainer : styles.miloMessageContainer
      ]}>
        {!isUser && (
          <View style={styles.avatarSmallContainer}>
             <Image 
              source={require('@assets/images/mascot.png')} 
              style={styles.avatarSmall} 
              resizeMode="contain"
            />
          </View>
        )}
        <View style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.miloBubble
        ]}>
          <TypographyComponent 
            variant="body" 
            style={{ color: isUser ? '#FFFFFF' : colors.text.primary }}
          >
            {item.text}
          </TypographyComponent>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header style "Insta" */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.headerProfile}>
            <View style={styles.avatarContainer}>
              <Image 
                source={require('@assets/images/mascot.png')} 
                style={styles.avatar} 
                resizeMode="contain"
              />
              <View style={styles.onlineBadge} />
            </View>
            <View style={styles.headerText}>
              <TypographyComponent variant="h6">Milo</TypographyComponent>
              <TypographyComponent variant="labelSmall" color={colors.text.secondary}>
                Milo l'assistant • En ligne
              </TypographyComponent>
            </View>
          </View>

          {/* <View style={styles.headerIcons}>
            <Phone size={24} color={colors.text.primary} style={{ marginRight: 20 }} />
            <Video size={24} color={colors.text.primary} />
          </View> */}
        </View>

        {/* Liste des messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        {/* Zone de saisie */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        >
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Envoyer un message..."
                placeholderTextColor={colors.text.tertiary}
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
              <TouchableOpacity 
                onPress={sendMessage} 
                style={[styles.sendButton, { opacity: inputText.length > 0 ? 1 : 0.5 }]}
                disabled={inputText.length === 0}
              >
                <TypographyComponent variant="h6" style={{color: colors.primary}}>
                  Envoyer
                </TypographyComponent>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    backgroundColor: colors.background,
  },
  backButton: {
    marginRight: 16,
  },
  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0', // Fond léger pour l'avatar
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.background,
  },
  headerText: {
    justifyContent: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Messages
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '80%',
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
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    minWidth: 60,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4, // Effet bulle "Insta"
  },
  miloBubble: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderBottomLeftRadius: 4, // Effet bulle "Insta"
  },

  // Input
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    maxHeight: 100,
    fontFamily: 'Qualy-neue-regular', // Utilisation de la font du corps
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 8,
  },
});

export default ChatScreen;