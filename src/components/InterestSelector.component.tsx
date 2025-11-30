import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ViewStyle
} from 'react-native';
import { X, Plus } from 'lucide-react-native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

interface InterestSelectorProps {
  label?: string;
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  containerStyle?: ViewStyle;
}

const SUGGESTED_INTERESTS = [
  'Jeux Vidéo', 'Football', 'Mangas', 'Histoire',
  'Sciences', 'Dessin', 'Musique', 'Animaux',
  'Programmation', 'Cinéma', 'Espace', 'Dinosaures'
];

const InterestSelector: React.FC<InterestSelectorProps> = ({
  label = "Centres d'intérêt",
  selectedInterests,
  onInterestsChange,
  containerStyle
}) => {
  const [currentInput, setCurrentInput] = useState('');

  const handleAddInput = () => {
    const trimmed = currentInput.trim();
    if (trimmed.length > 0 && !selectedInterests.includes(trimmed)) {
      onInterestsChange([...selectedInterests, trimmed]);
      setCurrentInput('');
    }
  };

  const handleAddSuggestion = (interest: string) => {
    if (!selectedInterests.includes(interest)) {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onInterestsChange(selectedInterests.filter((_, index) => index !== indexToRemove));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{ marginBottom: 8 }}>
          {label}
        </TypographyComponent>
      )}

      <View style={styles.inputWrapper}>
        <View style={styles.chipsContainer}>
          {selectedInterests.map((interest, index) => (
            <View key={index} style={styles.chip}>
              <Text style={styles.chipText}>{interest}</Text>
              <TouchableOpacity onPress={() => handleRemove(index)} style={styles.chipRemove}>
                <X size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
          <TextInput
            style={styles.textInput}
            placeholder={selectedInterests.length === 0 ? "Ex: Minecraft..." : "Ajouter..."}
            placeholderTextColor={colors.text.tertiary}
            value={currentInput}
            onChangeText={setCurrentInput}
            onSubmitEditing={handleAddInput}
            returnKeyType="done"
          />
        </View>

        {currentInput.length > 0 && (
          <TouchableOpacity onPress={handleAddInput} style={styles.addButton}>
             <Plus size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Suggestions */}
      <View style={styles.suggestionsContainer}>
        <TypographyComponent variant="labelSmall" color={colors.text.tertiary} style={{ marginBottom: 8 }}>
          Suggestions populaires :
        </TypographyComponent>
        <View style={styles.suggestionsList}>
          {SUGGESTED_INTERESTS.filter(i => !selectedInterests.includes(i)).slice(0, 8).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => handleAddSuggestion(item)}
            >
              <Plus size={12} color={colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputWrapper: {
    minHeight: 56,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border?.light || '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
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
  textInput: {
    fontSize: 15,
    color: colors.text?.primary || '#000',
    minWidth: 80,
    paddingVertical: 4,
    flex: 1,
  },
  addButton: {
    padding: 8,
    marginLeft: 4,
  },
  suggestionsContainer: {
    marginTop: 12,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  suggestionText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default InterestSelector;