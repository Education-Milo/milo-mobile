import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import TypographyComponent from '@components/Typography.component';
import Layout from '@components/Layout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '@theme/colors';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { ChevronDown, CheckCircle, Lock, PlayCircle, ArrowLeft, BookOpen, PenTool } from 'lucide-react-native';
import ChapterCard from '@components/Cards/ChapterCard.component';
import { useUserStore } from '@store/user/user.store';
import BottomSheetComponent from '@components/BottomSheetModal.component';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const CHAPITRES: Record<string, { id: string; title: string; lessons: Array<{ id: string; title: string; status: 'completed' | 'in-progress' | 'locked' }> }[]> = {
  'Mathématiques': [
    {
      id: 'ch1',
      title: 'Nombres',
      lessons: [
        { id: 'l1', title: 'Les nombres entiers', status: 'completed' },
        { id: 'l2', title: 'Les nombres décimaux', status: 'in-progress' },
        { id: 'l3', title: 'Les fractions', status: 'locked' },
      ]
    },
    {
      id: 'ch2',
      title: 'Géométrie',
      lessons: [
        { id: 'l4', title: 'Les formes de base', status: 'locked' },
        { id: 'l5', title: 'Les angles', status: 'locked' },
      ]
    },
  ],
  'Français': [
    {
      id: 'ch1',
      title: 'Grammaire',
      lessons: [
        { id: 'l1', title: 'Les noms', status: 'completed' },
        { id: 'l2', title: 'Les verbes', status: 'in-progress' },
      ]
    },
  ],
};

type LessonChapterRouteProp = RouteProp<AuthStackParamList, 'LessonChapter'>;
type LessonChapterNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

interface SelectedLesson {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
}

const ChapterAccordion = ({ chapter, chapterNumber, defaultOpen = false, onLessonPress }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getLessonIcon = (status: 'completed' | 'in-progress' | 'locked') => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={18} color="#4CAF50" />;
      case 'in-progress':
        return <PlayCircle size={18} color="#FF9800" />;
      case 'locked':
      default:
        return <Lock size={18} color="#9E9E9E" />;
    }
  };

  return (
    <View style={styles.chapterAccordion}>
      <TouchableOpacity
        style={styles.chapterHeader}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.chapterHeaderLeft}>
          <View style={styles.chapterHeaderTitle}>
            <TypographyComponent variant='labelSmall' color={colors.text.secondary}>
              Chapitre {chapterNumber}
            </TypographyComponent>
            <TypographyComponent variant="h6" style={{ marginTop: 4 }}>
              {chapter.title}
            </TypographyComponent>
          </View>
        </View>
        <ChevronDown
          size={24}
          color={colors.text.secondary}
          style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.chapterContent}>
          {chapter.lessons.map((lesson: any) => (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lessonItem, styles[`lesson_${lesson.status}`]]}
              onPress={() => lesson.status !== 'locked' && onLessonPress(lesson)}
              disabled={lesson.status === 'locked'}
            >
              <View style={styles.lessonIcon}>
                {getLessonIcon(lesson.status)}
              </View>
              <TypographyComponent variant="body" style={{ flex: 1 }}>
                {lesson.title}
              </TypographyComponent>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const LessonChapter = () => {
  const navigation = useNavigation<LessonChapterNavigationProp>();
  const route = useRoute<LessonChapterRouteProp>();
  const matiere = route.params;
  const chapitres = CHAPITRES[matiere.matiere] || [];
  const user = useUserStore((state) => state.user);
  
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedLesson, setSelectedLesson] = useState<SelectedLesson | null>(null);

  const handleLessonPress = (lesson: SelectedLesson) => {
    setSelectedLesson(lesson);
    bottomSheetRef.current?.present();
  };

  const handleOptionPress = (type: 'cours' | 'exercices') => {
    bottomSheetRef.current?.dismiss();
    // Navigation vers les pages correspondantes
    // navigation.navigate('Cours', { lessonId: selectedLesson?.id });
    // ou
    navigation.navigate('ExercicesScreen', { matiere: matiere.matiere, chapitre: 'test'});
    console.log(`Navigation vers ${type} pour la leçon ${selectedLesson?.id}`);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView style={styles.mainColumn} contentContainerStyle={styles.scrollContent}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color={colors.text.primary} />
            <TypographyComponent variant="h6" style={{ marginLeft: 8 }}>
              Mes matières
            </TypographyComponent>
          </TouchableOpacity>

          <ChapterCard
            userName={user?.prenom}
            courseTitle={matiere.matiere}
          />

          {/* Chapters List */}
          <View style={styles.chapterList}>
            {chapitres.map((chapter, index) => (
              <ChapterAccordion
                key={chapter.id}
                chapter={chapter}
                chapterNumber={index + 1}
                defaultOpen={index === 0}
                onLessonPress={handleLessonPress}
              />
            ))}
          </View>
        </ScrollView>

        {/* Bottom Sheet Modal */}
        <BottomSheetComponent ref={bottomSheetRef} snapPoints={['40%']}>
          <View style={styles.modalContent}>
            <TypographyComponent variant="h5" style={styles.modalTitle}>
              Choisissez une option
            </TypographyComponent>
            <TypographyComponent variant="body" color={colors.text.secondary} style={styles.modalSubtitle}>
              {selectedLesson?.title}
            </TypographyComponent>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionCard, styles.coursOption]}
                onPress={() => handleOptionPress('cours')}
              >
                <View style={styles.optionIconContainer}>
                  <BookOpen size={24} color="#FF6B35" />
                </View>
                <TypographyComponent variant="h6" style={styles.optionTitle}>
                  Cours
                </TypographyComponent>
                <TypographyComponent variant="labelSmall" color={colors.text.secondary}>
                  Apprendre la leçon
                </TypographyComponent>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionCard, styles.exercicesOption]}
                onPress={() => handleOptionPress('exercices')}
              >
                <View style={styles.optionIconContainer}>
                  <PenTool size={24} color="#4CAF50" />
                </View>
                <TypographyComponent variant="h6" style={styles.optionTitle}>
                  Exercices
                </TypographyComponent>
                <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{ textAlign: 'center' }}>
                  S'entraîner et pratiquer
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
    backgroundColor: '#FFF8F1',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mainColumn: {
  },
  scrollContent: {
    padding: 20,
  },
  programHeaderCard: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  miloFox: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  chapterList: {
    gap: 16,
  },
  chapterAccordion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    overflow: 'hidden',
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  chapterHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chapterHeaderTitle: {
    flex: 1,
  },
  chapterContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  lesson_completed: {
    backgroundColor: '#E8F5E9',
  },
  lesson_in_progress: {
    backgroundColor: '#FFF3E0',
  },
  lesson_locked: {
    backgroundColor: '#F5F5F5',
    opacity: 0.6,
  },
  lessonIcon: {
    marginRight: 12,
  },
  // Modal Styles
  modalContent: {
    flex: 1,
  },
  modalTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  coursOption: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F2',
  },
  exercicesOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8F4',
  },
  optionIconContainer: {
    marginBottom: 12,
  },
  optionTitle: {
    marginBottom: 4,
  },
});

export default LessonChapter;