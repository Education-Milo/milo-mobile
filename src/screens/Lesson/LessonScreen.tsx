import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';
import { RootStackParamList } from '@navigation/types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Animated, { FadeInDown } from 'react-native-reanimated'; // ← AJOUT
import TypographyComponent from '@components/Typography.component';
import LessonCard from '@components/Cards/LessonCard.component';
import SubjectCard from '@components/SubjectCard.component';
import { colors } from '@themes/colors';
import { useUserStore } from '@store/user/user.store';
import { useState } from 'react';
import React from 'react';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LessonScreenProps {
  navigation: NavigationProp;
}

function LessonScreen({ navigation }: LessonScreenProps) {
  const user = useUserStore(state => state.user);
  const [currentClass, setCurrentClass] = useState('5eme');

  const matieres = [
    {
      nom: 'Mathématiques',
      description: 'Nombres, algèbre, géométrie et fonctions.',
      icon: '🧮',
      borderColor: '#3B82F6',
      iconBackground: '#DBEAFE',
    },
    {
      nom: 'Français',
      description: 'Grammaire, conjugaison, lecture et écriture.',
      icon: '🇫🇷',
      borderColor: '#EF4444',
      iconBackground: '#FEE2E2',
    },
    {
      nom: 'Histoire-Géographie',
      description: 'De l\'Antiquité à l\'époque contemporaine.',
      icon: '🏛️',
      borderColor: '#F59E0B',
      iconBackground: '#FEF3C7',
    },
    {
      nom: 'Anglais',
      description: 'Vocabulaire, verbes irréguliers et discussion.',
      icon: '🇬🇧',
      borderColor: '#8B5CF6',
      iconBackground: '#EDE9FE',
    },
    {
      nom: 'Physique-Chimie',
      description: 'Atomes, énergie, réactions et lois de l\'univers.',
      icon: '🔬',
      borderColor: '#F97316',
      iconBackground: '#FFEDD5',
    },
    {
      nom: 'SVT',
      description: 'Sciences de la Vie et de la Terre.',
      icon: '🌱',
      borderColor: '#10B981',
      iconBackground: '#D1FAE5',
    },
    {
      nom: 'Technologie',
      description: 'Conception, objets techniques et numérique.',
      icon: '🤖',
      borderColor: '#EC4899',
      iconBackground: '#FCE7F3',
    },
    {
      nom: 'Enseignement moral et civique',
      description: 'Citoyenneté, valeurs et vivre ensemble.',
      icon: '⚖️',
      borderColor: '#6366F1',
      iconBackground: '#E0E7FF',
    },
    {
      nom: 'Éducation musicale',
      description: 'Découverte des instruments et de la musique.',
      icon: '🎵',
      borderColor: '#14B8A6',
      iconBackground: '#CCFBF1',
    },
    {
      nom: 'Arts plastiques',
      description: 'Dessin, peinture et expression artistique.',
      icon: '🎨',
      borderColor: '#F43F5E',
      iconBackground: '#FFE4E6',
    },
  ];

  return (
    <Layout navigation={navigation}>
      <Animated.ScrollView
        entering={FadeInDown.duration(600).springify()}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
                <LessonCard
          userName={user?.prenom}
        />
        <View style={styles.header}>
          <TypographyComponent variant="h4" style={styles.headerTitle}>
            Matières générales
          </TypographyComponent>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currentClass}
              onValueChange={(itemValue) => setCurrentClass(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="6ème" value="6eme" />
              <Picker.Item label="5ème" value="5eme" />
              <Picker.Item label="4ème" value="4eme" />
              <Picker.Item label="3ème" value="3eme" />
            </Picker>
          </View>
        </View>

        {/* Grille de matières */}
        <View style={styles.subjectsContainer}>
          {matieres.map((matiere) => (
            <SubjectCard
              key={matiere.nom}
              title={matiere.nom}
              description={matiere.description}
              icon={matiere.icon}
              borderColor={matiere.borderColor}
              iconBackground={matiere.iconBackground}
              onPress={() => navigation.navigate('LessonChapter', { matiere: matiere.nom })}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a202c',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    minWidth: 120,
  },
  picker: {
    height: 50,
    color: '#1a202c',
  },
  subjectsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});

export default LessonScreen;