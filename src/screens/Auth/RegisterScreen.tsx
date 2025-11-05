import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import styles from '@navigation/constants/Colors';
import { RootStackParamList } from '@navigation/types';
import MainButton from '@components/MainButtonComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextFieldComponent from '@components/TextField.component';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';
import { useRegisterForm } from '@hook/useRegisterForm';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: NavigationProp;
}

function RegisterScreen({ navigation }: RegisterScreenProps) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    role,
    setRole,
    roles,
    errors,
    isSubmitting,
    handleRegister,
  } = useRegisterForm({ navigation });

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
              }}
              editable={!isSubmitting}
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
              }}
              editable={!isSubmitting}
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
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isSubmitting}
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
              }}
              type="password"
              editable={!isSubmitting}
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
              }}
              type="password"
              editable={!isSubmitting}
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
                  }}
                  disabled={isSubmitting}
                >
                  <TypographyComponent
                    style={[
                      styles.roleButtonText,
                      role === roleOption.key && styles.roleButtonTextActive,
                    ]}
                  >
                    {roleOption.label}
                  </TypographyComponent>
                </TouchableOpacity>
              ))}
            </View>
            {errors.role && <TypographyComponent style={styles.errorText}>{errors.role}</TypographyComponent>}
          </View>

          {/* Conditions d'utilisation */}
          <View style={styles.termsContainer}>
            <TypographyComponent style={styles.termsText}>
              En rejoignant Milo, vous confirmez avoir lu et accepté les{' '}
              <TypographyComponent style={styles.termsLink}>
                conditions générales d'utilisation
              </TypographyComponent>{' '}
              et la{' '}
              <TypographyComponent style={styles.termsLink}>politique de confidentialité</TypographyComponent>
              .
            </TypographyComponent>
          </View>
          <MainButton
            onPress={handleRegister}
            loading={isSubmitting}
            title="S'inscrire"
            style={{ marginBottom: 20 }}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default RegisterScreen;