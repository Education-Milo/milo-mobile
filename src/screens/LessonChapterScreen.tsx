import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from '@components/Layout';
import TypographyComponent from '@components/Typography.component';
import ChapterCard from '@components/Cards/ChapterCard.component';
import BottomSheetComponent from '@components/BottomSheetModal.component';
import { colors } from '@theme/colors';
import ChapterAccordion from '@components/Lesson/ChapterAccordion.component';
import LoadingScreen from './LoadingScreen';
import { useLessonChapterScreen } from '@hooks/useLessonChapterScreen';

const LessonChapter = () => {
  const {
    user,
    matiere,
    selectedLesson,
    coursesWithChapters,
    bottomSheetRef,
    handleLessonPress,
    handleOptionPress,
    handleGoBack,
    isLoading,
  } = useLessonChapterScreen();

  if (isLoading) {
    return <LoadingScreen />;
  }


  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
            <TypographyComponent variant="h6" style={{ marginLeft: 8 }}>Retour</TypographyComponent>
          </TouchableOpacity>

          <ChapterCard
            userName={user?.first_name}
            courseTitle={matiere}
          />
        <View style={styles.chapterList}>
          {coursesWithChapters.length ? (
            coursesWithChapters.map((course) => (
              <View key={course.id}>
                <TypographyComponent variant="h5" style={{ marginBottom: 12 }}>
                  {course.title}
                </TypographyComponent>
                {course.chapters.map((chapter, index) => (
                  <ChapterAccordion
                    key={chapter.id}
                    chapter={chapter}
                    chapterNumber={index + 1}
                    defaultOpen={index === 0}
                    onLessonPress={handleLessonPress}
                  />
                ))}
              </View>
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
                <View style={styles.optionIconContainer}>
                  <Ionicons name="book-outline" size={24} color="#FF6B35" />
                </View>
                <TypographyComponent variant="h6" style={styles.optionTitle}>Apprendre</TypographyComponent>
                <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{ textAlign: 'center' }}>
                  Cours interactif avec Milo
                </TypographyComponent>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.optionCard, styles.exercicesOption]} onPress={() => handleOptionPress('exercices')}>
                <View style={styles.optionIconContainer}>
                  <Ionicons name="pencil" size={24} color="#4CAF50" />
                </View>
                <TypographyComponent variant="h6" style={styles.optionTitle}>S'entraîner</TypographyComponent>
                <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{ textAlign: 'center' }}>
                  Quiz et exercices
                </TypographyComponent>
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
    justifyContent: 'space-between',
    maxHeight: 125
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