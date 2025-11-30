import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Text
} from 'react-native';
import { Camera, ChevronLeft, User, Mail, X, Plus } from 'lucide-react-native';
import TypographyComponent from '@components/Typography.component';
import TextFieldComponent from '@components/TextField.component';
import InterestSelector from '@components/InterestSelector.component';
import { colors } from '@theme/colors';
import { useEditProfile } from '@hooks/useEditProfileScreen';
import { ClassType } from '@store/user/user.model';

const EditProfileScreen = () => {
    const {
        formData,
        interests,
        selectedClass,
        handleChange,
        setInterests,
        setSelectedClass,
        handleSave,
        goBack,
        loading
    } = useEditProfile();
  const classOptions: ClassType[] = ['6ème', '5ème', '4ème', '3ème'];

  const FormField = ({ label, value, fieldKey, icon: Icon, keyboardType }: any) => (
    <View style={styles.inputContainer}>
      <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{ marginBottom: 8 }}>
        {label}
      </TypographyComponent>
      <TextFieldComponent
        value={value}
        onChangeText={(text) => handleChange(fieldKey, text)}
        placeholder={label}
        keyboardType={keyboardType}
        icon={Icon ? <Icon size={20} color={colors.text.tertiary} /> : undefined}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <ChevronLeft size={28} color={colors.text.primary} />
          </TouchableOpacity>
          <TypographyComponent variant="h4">Mon Profil</TypographyComponent>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarWrapper} activeOpacity={0.8}>
            <Image
              source={require('@assets/images/avatars/profil_picture1.png')}
              style={styles.avatar}
            />
            <View style={styles.cameraBadge}>
              <Camera size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 12 }}>
            <TypographyComponent variant="label" color={colors.primary}>
              Modifier la photo
            </TypographyComponent>
          </View>
        </View>

        <View style={styles.formSection}>
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <FormField
                label="Prénom"
                value={formData.prenom}
                fieldKey="prenom"
                icon={User}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <FormField
                label="Nom"
                value={formData.nom}
                fieldKey="nom"
              />
            </View>
          </View>

          <FormField
            label="Email"
            value={formData.email}
            fieldKey="email"
            icon={Mail}
            keyboardType="email-address"
          />

        <InterestSelector
            selectedInterests={interests}
            onInterestsChange={setInterests}
        />
        <View style={styles.inputContainer}>
            <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{ marginBottom: 8 }}>
              Ma Classe
            </TypographyComponent>

            <View style={styles.classSelectorContainer}>
                {classOptions.map((classeOption) => {
                const isSelected = selectedClass === classeOption;
                return (
                    <TouchableOpacity
                      key={classeOption}
                      style={[
                        styles.classChip,
                        isSelected && styles.classChipSelected
                      ]}
                      onPress={() => setSelectedClass(classeOption)}
                      activeOpacity={0.7}
                    >
                      <TypographyComponent
                        variant="label"
                        color={isSelected ? '#FFF' : colors.text.primary}
                        style={{ fontWeight: isSelected ? '700' : '400' }}
                      >
                        {classeOption}
                      </TypographyComponent>
                    </TouchableOpacity>
                    );
                    })}
                </View>
            </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, loading && { opacity: 0.7 }]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={loading}
          >
            <TypographyComponent variant="button" color="#FFF">
              {loading ? "Enregistrement..." : "Enregistrer"}
            </TypographyComponent>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20, alignSelf: 'center' }}>
            <TypographyComponent variant="labelSmall" color="#FF4444">
              Supprimer mon compte
            </TypographyComponent>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#E5E5E5',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.background,
  },
  formSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 4,
  },
  footer: {
    padding: 20,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  classSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Répartit les boutons sur la largeur
    gap: 8,
  },
  classChip: {
    flex: 1, // Chaque bouton prend la même largeur
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.border?.light || '#DDD',
    // Ombres légères
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  classChipSelected: {
    backgroundColor: colors.primary, // Votre couleur principale (ex: Bleu/Violet)
    borderColor: colors.primary,
    // Ombre un peu plus marquée pour l'effet "activé"
    shadowOpacity: 0.2,
    elevation: 3,
  },
});

export default EditProfileScreen;