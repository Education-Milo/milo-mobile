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
          // enableAutomaticScroll={true}
          // extraScrollHeight={20} // Espace supplémentaire au-dessus du champ
          // keyboardShouldPersistTaps="handled"
        >
        <ScrollView
          style={styles.registerScrollView}
          contentContainerStyle={styles.registerScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              styles.subtitle,
              {
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                marginLeft: 10,
                marginBottom: 15,
                fontSize: 20,
              },
            ]}
          >
            Inscription
          </Text>
          {/* Nom */}
          <View style={styles.registerInputContainer}>
            <View style={styles.inputIconContainer}>
              <Ionicons name='person-outline' size={20} color='#666' />
              <TextInput
                style={[styles.input, errors.lastName && styles.inputError]}
                onChangeText={text => {
                  setLastName(text);
                  setErrors(prev => ({ ...prev, lastName: undefined }));
                }}
                value={lastName}
                placeholder='Nom'
                placeholderTextColor='#999'
                editable={!isLoading}
              />
            </View>
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>

          {/* Prénom */}
          <View style={styles.registerInputContainer}>
            <View style={styles.inputIconContainer}>
              <Ionicons name='person-outline' size={20} color='#666' />
              <TextInput
                style={[styles.input, errors.firstName && styles.inputError]}
                onChangeText={text => {
                  setFirstName(text);
                  setErrors(prev => ({ ...prev, firstName: undefined }));
                }}
                value={firstName}
                placeholder='Prénom'
                placeholderTextColor='#999'
                editable={!isLoading}
              />
            </View>
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.registerInputContainer}>
            <View style={styles.inputIconContainer}>
              <Ionicons name='mail-outline' size={20} color='#666' />
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                onChangeText={text => {
                  setEmail(text);
                  setErrors(prev => ({ ...prev, email: undefined }));
                }}
                value={email}
                placeholder='Adresse email'
                placeholderTextColor='#999'
                keyboardType='email-address'
                autoCapitalize='none'
                editable={!isLoading}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Mot de passe */}
          <View style={styles.registerInputContainer}>
            <View style={styles.inputIconContainer}>
              <Ionicons name='lock-closed-outline' size={20} color='#666' />
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                onChangeText={text => {
                  setPassword(text);
                  setErrors(prev => ({ ...prev, password: undefined }));
                }}
                value={password}
                placeholder='Mot de passe'
                placeholderTextColor='#999'
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ padding: 10 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color='#666'
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Confirmation mot de passe */}
          <View style={styles.registerInputContainer}>
            <View style={styles.inputIconContainer}>
              <Ionicons name='lock-closed-outline' size={20} color='#666' />
              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError,
                ]}
                onChangeText={text => {
                  setConfirmPassword(text);
                  setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                }}
                value={confirmPassword}
                placeholder='Confirmation du mot de passe'
                placeholderTextColor='#999'
                secureTextEntry={!showPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ padding: 10 }}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color='#666'
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Sélection du rôle */}
          <View style={styles.registerInputContainer}>
            <Text style={styles.roleLabel}>Sélectionnez votre rôle :</Text>
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
        </ScrollView>
      </KeyboardAwareScrollView>
      {/* Bouton d'inscription */}
      <MainButton
        onPress={handleRegister}
        loading={isLoading}
        title="S'inscrire"
        style={{ width: '100%', marginBottom: 20 }}
      />
    </View>
  );
}

export default RegisterScreen;
