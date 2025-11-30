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
import { useNavigation } from '@react-navigation/native';
import { Camera, ChevronLeft, User, Mail, X, Plus } from 'lucide-react-native';

// Imports internes
import TypographyComponent from '@components/Typography.component';
import TextFieldComponent from '@components/TextField.component';
import { colors } from '@theme/colors';
import { useUserStore } from '@store/user/user.store';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState({
    prenom: user?.prenom || 'Thomas',
    nom: user?.nom || 'Dubois',
    email: user?.email || 'thomas.dubois@email.com',
  });

  const [interests, setInterests] = useState<string[]>([
    'Mathématiques',
    'Fortnite',
    'Barbie',
    'Espace'
  ]);

  const [currentInterest, setCurrentInterest] = useState('');

  const handleChange = (key: string, text: string) => {
    setFormData(prev => ({ ...prev, [key]: text }));
  };

  const handleAddInterest = () => {
    if (currentInterest.trim().length > 0) {
      if (!interests.includes(currentInterest.trim())) {
        setInterests([...interests, currentInterest.trim()]);
      }
      setCurrentInterest('');
    }
  };

  const handleRemoveInterest = (indexToRemove: number) => {
    setInterests(interests.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = () => {
    console.log('Données sauvegardées:', { ...formData, interests });
    navigation.goBack();
  };

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
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={28} color={colors.text.primary} />
          </TouchableOpacity>
          <TypographyComponent variant="h4">Mon Profil</TypographyComponent>
          <View style={{ width: 28 }} />
        </View>

        {/* --- Section Avatar --- */}
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

        {/* --- Formulaire --- */}
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

          <View style={styles.inputContainer}>
            <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{ marginBottom: 8 }}>
              Centres d'intérêt
            </TypographyComponent>
            <View style={styles.interestsContainer}>
              <View style={styles.chipsWrapper}>
                {interests.map((interest, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{interest}</Text>
                    <TouchableOpacity onPress={() => handleRemoveInterest(index)} style={styles.chipRemove}>
                      <X size={14} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                ))}
                <TextInput
                  style={styles.addTagInput}
                  placeholder="Ajouter... (+ Entrée)"
                  placeholderTextColor={colors.text.tertiary}
                  value={currentInterest}
                  onChangeText={setCurrentInterest}
                  onSubmitEditing={handleAddInterest}
                />
              </View>
              {currentInterest.length > 0 && (
                <TouchableOpacity onPress={handleAddInterest} style={styles.addButton}>
                   <Plus size={20} color={colors.primary} />
                </TouchableOpacity>
              )}
            </View>
            <TypographyComponent variant="labelSmall" color={colors.text.tertiary} style={{marginTop: 6, fontSize: 11}}>
              Appuyez sur "+" pour valider un tag.
            </TypographyComponent>
          </View>

        </View>

        {/* --- Footer --- */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
            <TypographyComponent variant="button" color="#FFF">
              Enregistrer
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
  interestsContainer: {
    minHeight: 56, // Hauteur min comme les autres inputs
    backgroundColor: '#FFF',
    borderRadius: 16, // Arrondi rectangulaire
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border?.light || '#DDD',
    // Ombres identiques à TextFieldComponent
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary, // Ou une couleur secondaire
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  chipText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  chipRemove: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 2,
  },
  addTagInput: {
    fontSize: 15,
    color: colors.text.primary,
    minWidth: 100,
    paddingVertical: 4,
  },
  addButton: {
    padding: 8,
    marginLeft: 4,
  },

  // --- Footer ---
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
});

export default EditProfileScreen;