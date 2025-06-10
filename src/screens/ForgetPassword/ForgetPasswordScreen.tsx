import React, { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import styles from '@constants/Colors';
import MainButtonComponent from '@components/MainButtonComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

interface ForgetPasswordScreenProps {
  navigation: NavigationProp;
}

function ForgetPasswordScreen({ navigation }: ForgetPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim()) {
      setEmailError('Veuillez saisir votre adresse email');
      return;
    }

    // Validation basique du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Veuillez saisir une adresse email valide');
      return;
    }

    setIsLoading(true);
    // Simulation d'un appel API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Reset error quand l'utilisateur tape
    if (emailError) {
      setEmailError('');
    }
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Ionicons name='mail' size={32} color='#FF8C00' />
          </View>
          <Text style={styles.successTitle}>Email envoyé !</Text>
          <Text style={styles.successMessage}>
            Nous avons envoyé un lien de réinitialisation à votre adresse email.
            Vérifiez votre boîte de réception et suivez les instructions.
          </Text>
          <View style={localStyles.returnLogin}>
            <MainButtonComponent
            title='Retour à la connexion'
            onPress={handleGoBack}
            loading={isLoading}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={localStyles.container}>
      <View style={styles.registerHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name='arrow-back' size={24} color='#000000' />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/logo_sans_fond.png')}
          style={styles.logoRegisterHeader}
        />
        <View style={styles.headerPlaceholder} />
      </View>

        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          // enableAutomaticScroll={true}
          // extraScrollHeight={20} // Espace supplémentaire au-dessus du champ
          // keyboardShouldPersistTaps="handled"
        >
        <View style={localStyles.content}>
          {/* Titre */}
          <Text
            style={[
              styles.subtitle,
              {
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                paddingHorizontal: 5,
                marginBottom: 15,
                fontSize: 20,
              },
            ]}
          >
            Mot de passe oublié ?
          </Text>
          <Text style={[styles.subtitle, { paddingHorizontal: 5 }]}>
            Veuillez renseigner, votre adresse mail afin de recevoir les
            instructions pour réinitialiser votre mot de passe :
          </Text>

          {/* Champ email avec gestion d'erreur */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <Ionicons name='mail-outline' size={20} color='#666' />
              <TextInput
                style={styles.input}
                placeholder='Votre adresse email'
                placeholderTextColor='#999'
                value={email}
                onChangeText={handleEmailChange}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
              />
            </View>
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>

          {/* Espaceur flexible */}
          <View style={localStyles.spacer} />
        </View>

        {/* Bouton en bas */}
        <View style={localStyles.bottomContainer}>
          <MainButtonComponent
            title='Envoyer'
            onPress={handleSubmit}
            loading={isLoading}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  returnLogin: {
    paddingHorizontal : 30,
    paddingTop: 15,
    width: '100%',
  },
  errorText: {
    color: '#FF4545',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
  },
});

export default ForgetPasswordScreen;
