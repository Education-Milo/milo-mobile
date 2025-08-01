import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/types';
import TypographyComponent from '@components/Typography.component';
import Card from '@components/Card.component';
import Layout from '@components/Layout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@themes/colors';
import BottomSheetComponent from '@components/BottomSheetModal.component';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const CHAPITRES: Record<string, string[]> = {
  'Mathématiques': ['Nombres', 'Géométrie', 'Proportionnalité'],
  'Français': ['Grammaire', 'Orthographe', 'Lecture'],
  'SVT': ['Cellule', 'Écosystèmes'],
  'Histoire-Géographie': ['Révolutions', 'Cartographie'],
  'Physique-Chimie': ['Matière', 'Énergie'],
  'Anglais': ['Vocabulaire', 'Grammaire', 'Compréhension'],
  'Enseignement moral et civique': ['Valeurs', 'Citoyenneté'],
  'Éducation musicale': ['Chant', 'Histoire de la musique'],
  'Arts plastiques': ['Dessin', 'Couleurs'],
  'Technologie': ['Informatique', 'Objets techniques'],
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LessonChapterScreenProps {
  navigation: NavigationProp;
  route: RouteProp<RootStackParamList, 'LessonChapter'>;
}

const LessonChapter = ({ navigation, route }: LessonChapterScreenProps) => {
  const matiere = route.params.matiere;
  const chapitres = CHAPITRES[matiere] || [];
  const [selectedChapter, setSelectedChapter] = useState<string>('');

  const bottomSheetRef = useRef<BottomSheetModal>(null!);
  const snapPoints = useMemo(() => ['60%', '40%'], []);

  const handleModalOpen = useCallback((chapitre: string) => {
    setSelectedChapter(chapitre);
    bottomSheetRef.current?.present();
  }, []);

  const handleCours = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    navigation.navigate('ChatScreen', { matiere, chapitre: selectedChapter });
  }, [navigation, matiere, selectedChapter]);

  const handleExercices = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    navigation.navigate('ExercicesScreen', { matiere, chapitre: selectedChapter });
  }, [navigation, matiere, selectedChapter]);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <TypographyComponent variant="h4" style={{ marginBottom: 20 }} color={colors.text.title}>
          {matiere}
        </TypographyComponent>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {chapitres.map((chapitre) => (
            <Card
              key={chapitre}
              style={{ marginBottom: 12 }}
              onPress={() => handleModalOpen(chapitre)}
            >
              <TypographyComponent variant="body">{chapitre}</TypographyComponent>
            </Card>
          ))}
        </ScrollView>

        <BottomSheetComponent
          ref={bottomSheetRef}
          enableDynamicSizing={true}
          snapPoints={snapPoints}
          style={{ backgroundColor: colors.background, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        >
          <TypographyComponent variant="h5" style={styles.bottomSheetTitle}>
            {selectedChapter}
          </TypographyComponent>

          <TouchableOpacity style={styles.button} onPress={handleCours}>
            <TypographyComponent variant="button" color="#FFFFFF">
              📚 Cours
            </TypographyComponent>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#F5A623' }]} onPress={handleExercices}>
            <TypographyComponent variant="button" color="#FFFFFF">
              ✏️ Exercices
            </TypographyComponent>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCloseBottomSheet}
            style={styles.cancelButton}
          >
            <TypographyComponent variant="button" color={colors.text.secondary}>
              Annuler
            </TypographyComponent>
          </TouchableOpacity>
        </BottomSheetComponent>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  bottomSheetTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LessonChapter;