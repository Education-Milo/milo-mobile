import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import styles from '@constants/Colors';
import { RootStackParamList } from '@navigation/types';
import MainButton from '@components/MainButtonComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextFieldComponent from '@components/TextField.component';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: NavigationProp;
}

function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
  }>({});

  const roles = [
    { key: 'Eleve', label: 'Élève' },
    { key: 'Parent', label: 'Parent' },
    { key: 'Prof', label: 'Professeur' },
  ];

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password =
        'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!role) {
      newErrors.role = 'Veuillez sélectionner un rôle';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulation d'un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Ici vous pouvez ajouter votre logique d'inscription
      // Par exemple, envoyer les données à votre API

      Alert.alert(
        'Inscription réussie',
        'Votre compte a été créé avec succès !',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.registerContainer}>
      <View style={styles.registerHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name='arrow-back' size={24} color='#000000' />
        </TouchableOpacity>
        <Image
          source={require('@assets/images/logo_sans_fond.png')}
          style={styles.logoRegisterHeader}
        />
        <View style={styles.headerPlaceholder} />
      </View>

        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
        <ScrollView
          style={styles.registerScrollView}
          contentContainerStyle={styles.registerScrollContent}
          showsVerticalScrollIndicator={false}
        >

          <TypographyComponent
            variant='h3'
            style={{
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginLeft: 10,
              marginBottom: 15,
            }}
            color={colors.text.title}
          >
            Inscription
          </TypographyComponent>
          {/* Nom */}
          <View style={styles.registerInputContainer}>
            <TextFieldComponent
              placeholder="Nom"
              icon={<Ionicons name='person-outline' size={20} color='#666' />}
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                setErrors(prev => ({ ...prev, lastName: undefined }));
              }}
              editable={!isLoading}
              error={errors.lastName}
            />
          </View>

          {/* Prénom */}
          <View style={styles.registerInputContainer}>
            <TextFieldComponent
              placeholder="Prénom"
              icon={<Ionicons name='person-outline' size={20} color='#666' />}
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                setErrors(prev => ({ ...prev, firstName: undefined }));
              }}
              editable={!isLoading}
              error={errors.firstName}
            />
          </View>

          {/* Email */}
          <View style={styles.registerInputContainer}>
            <TextFieldComponent
              placeholder="Adresse email"
              icon={<Ionicons name='mail-outline' size={20} color='#666' />}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setErrors(prev => ({ ...prev, email: undefined }));
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
              error={errors.email}
            />
          </View>

          {/* Mot de passe */}
          <View style={styles.registerInputContainer}>
            <TextFieldComponent
              placeholder="Mot de passe"
              icon={<Ionicons name='lock-closed-outline' size={20} color='#666' />}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrors(prev => ({ ...prev, password: undefined }));
              }}
              type="password"
              editable={!isLoading}
              error={errors.password}
            />
          </View>

          {/* Confirmation mot de passe */}
          <View style={styles.registerInputContainer}>
            <TextFieldComponent
              placeholder="Confirmation du mot de passe"
              icon={<Ionicons name='lock-closed-outline' size={20} color='#666' />}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setErrors(prev => ({ ...prev, confirmPassword: undefined }));
              }}
              type="password"
              editable={!isLoading}
              error={errors.confirmPassword}
            />
          </View>

          {/* Sélection du rôle */}
          <View style={styles.registerInputContainer}>
            <TypographyComponent
              variant='labelLarge'
              style={{marginBottom: 10}}
              color={colors.text.title}
            >
              Sélectionnez votre rôle :
            </TypographyComponent>
            <View style={styles.roleContainer}>
              {roles.map(roleOption => (
                <TouchableOpacity
                  key={roleOption.key}
                  style={[
                    styles.roleButton,
                    role === roleOption.key && styles.roleButtonActive,
                  ]}
                  onPress={() => {
                    setRole(roleOption.key);
                    setErrors(prev => ({ ...prev, role: undefined }));
                  }}
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      role === roleOption.key && styles.roleButtonTextActive,
                    ]}
                  >
                    {roleOption.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
          </View>

          {/* Conditions d'utilisation */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              En rejoignant Milo, vous confirmez avoir lu et accepté les{' '}
              <Text style={styles.termsLink}>
                conditions générales d'utilisation
              </Text>{' '}
              et la{' '}
              <Text style={styles.termsLink}>politique de confidentialité</Text>
              .
            </Text>
          </View>
          <MainButton
            onPress={handleRegister}
            loading={isLoading}
            title="S'inscrire"
            style={{ marginBottom: 20 }}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
      {/* Bouton d'inscription */}
    </View>
  );
}

export default RegisterScreen;
