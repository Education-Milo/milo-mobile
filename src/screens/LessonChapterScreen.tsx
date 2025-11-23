import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {  ArrowLeft, BookOpen, PenTool } from 'lucide-react-native';

import Layout from '@components/Layout';
import TypographyComponent from '@components/Typography.component';
import ChapterCard from '@components/Cards/ChapterCard.component';
import BottomSheetComponent from '@components/BottomSheetModal.component';
import { colors } from '@theme/colors';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { useUserStore } from '@store/user/user.store';
import { useCourseStore } from '@store/course/course.store';
import { Lesson, Chapter } from '@store/course/course.model';
import ChapterAccordion from '@components/Lesson/ChapterAccordion.component';

type LessonChapterRouteProp = RouteProp<AuthStackParamList, 'LessonChapter'>;
type LessonChapterNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const LessonChapter = () => {
  const navigation = useNavigation<LessonChapterNavigationProp>();
  const route = useRoute<LessonChapterRouteProp>();
  const { matiere } = route.params;

  const user = useUserStore((state) => state.user);

  const { currentCourse, fetchCourseBySubject, isLoading } = useCourseStore();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (matiere) {
      fetchCourseBySubject(matiere);
    }
  }, [matiere]);

  const handleLessonPress = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    bottomSheetRef.current?.present();
  };

  const handleOptionPress = (type: 'cours' | 'exercices') => {
    bottomSheetRef.current?.dismiss();
    if (type === 'cours' && selectedLesson) {
      // ✅ C'est ici que l'interactivité commence !
      // On envoie l'ID et le titre à l'écran de chat pour qu'il lance la leçon
      navigation.navigate('ChatScreen', {
        lessonId: selectedLesson.id,
        lessonTitle: selectedLesson.title,
        context: `Explique-moi la leçon : ${selectedLesson.title}`
      });
    } else {
      navigation.navigate('ExercicesScreen', {
        matiere: matiere,
        chapitre: currentCourse?.title || 'Général'
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <TypographyComponent style={{ marginTop: 16 }}>Chargement du programme...</TypographyComponent>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={colors.text.primary} />
            <TypographyComponent variant="h6" style={{ marginLeft: 8 }}>Retour</TypographyComponent>
          </TouchableOpacity>

          <ChapterCard
            userName={user?.prenom}
            courseTitle={matiere}
          />

          <View style={styles.chapterList}>
            {currentCourse?.chapters?.length ? (
              currentCourse.chapters.map((chapter, index) => (
                <ChapterAccordion
                  key={chapter.id}
                  chapter={chapter}
                  chapterNumber={index + 1}
                  defaultOpen={index === 0}
                  onLessonPress={handleLessonPress}
                />
              ))
            ) : (
              <TypographyComponent style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
                Aucun chapitre trouvé pour cette matière.
              </TypographyComponent>
            )}
          </View>
        </ScrollView>

        <BottomSheetComponent ref={bottomSheetRef} snapPoints={['40%']}>
          <View style={styles.modalContent}>
            <TypographyComponent variant="h5" style={styles.modalTitle}>
              Que veux-tu faire ?
            </TypographyComponent>
            <TypographyComponent variant="body" color={colors.text.secondary} style={styles.modalSubtitle}>
              {selectedLesson?.title}
            </TypographyComponent>

            <View style={styles.optionsContainer}>
              <TouchableOpacity style={[styles.optionCard, styles.coursOption]} onPress={() => handleOptionPress('cours')}>
                <View style={styles.optionIconContainer}><BookOpen size={24} color="#FF6B35" /></View>
                <TypographyComponent variant="h6" style={styles.optionTitle}>Apprendre</TypographyComponent>
                <TypographyComponent variant="labelSmall" color={colors.text.secondary}>Cours interactif avec Milo</TypographyComponent>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.optionCard, styles.exercicesOption]} onPress={() => handleOptionPress('exercices')}>
                <View style={styles.optionIconContainer}><PenTool size={24} color="#4CAF50" /></View>
                <TypographyComponent variant="h6" style={styles.optionTitle}>S'entraîner</TypographyComponent>
                <TypographyComponent variant="labelSmall" color={colors.text.secondary}>Quiz et exercices</TypographyComponent>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetComponent>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1'
  },
  scrollContent: {
    padding: 20
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  chapterList: {
    gap: 16
  },
  modalContent: {
    flex: 1,
    padding: 20
  },
  modalTitle: {
    marginBottom: 8,
    textAlign: 'center'
  },
  modalSubtitle: {
    marginBottom: 24,
    textAlign: 'center'
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between'
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0'
  },
  coursOption: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F2'
  },
  exercicesOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8F4'
  },
  optionIconContainer: {
    marginBottom: 12
  },
  optionTitle: {
    marginBottom: 4
  },
});

export default LessonChapter;