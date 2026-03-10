import { useRef, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { useUserStore } from '@store/user/user.store';
import { Chapter, Course, Lesson } from '@store/course/course.model';
import { fetchChapters, fetchLessons, useCourses, useSubjects } from '@queries/course.queries';
import { useQueries } from '@tanstack/react-query';

type LessonChapterRouteProp = RouteProp<AuthStackParamList, 'LessonChapter'>;
type LessonChapterNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export type LessonWithStatus = Lesson & {
  status: 'completed' | 'in-progress' | 'locked';
};

export type ChapterWithLessons = Chapter & {
  lessons: LessonWithStatus[];
};

export type CourseWithChapters = Course & {
  chapters: ChapterWithLessons[];
};

export const useLessonChapterScreen = () => {
  const navigation = useNavigation<LessonChapterNavigationProp>();
  const route = useRoute<LessonChapterRouteProp>();
  const { matiere } = route.params;

  const user = useUserStore((state) => state.user);
  const { data: subjects = [], isLoading: isLoadingSubjects } = useSubjects();
  const subject = subjects.find(s => s.title === matiere);
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses(subject?.id);
  const ChaptersQueries = useQueries({
    queries: courses.map(course => ({
      queryKey: ['chapters', course.id],
      queryFn: () => fetchChapters(course.id),
      enabled: !!course.id,
    }))
  });
  const chapters = ChaptersQueries.map(q => q.data || []);
  const allChapters = chapters.flat()
  
  const LessonsQueries = useQueries({
    queries: allChapters.map(chapter => ({
      queryKey: ['lessons', chapter.id],
      queryFn: () => fetchLessons(chapter.id),
      enabled: !!allChapters.length,
    }))
  });

  const isLoading =
  isLoadingSubjects ||
  isLoadingCourses ||
  ChaptersQueries.some(q => q.isLoading) ||
  LessonsQueries.some(q => q.isLoading);

  const lessons = LessonsQueries.map(q => q.data ?? []);
  const allLessons = lessons.flat()

  const coursesWithChapters: CourseWithChapters[] = courses.map(course => {
    const courseChapters = ChaptersQueries
      .find(q => q.data?.some(ch => ch.course_id === course.id))
      ?.data ?? [];
    return {
      ...course,
      chapters: courseChapters.map(chapter => ({
        ...chapter,
        lessons: allLessons
          .filter(lesson => lesson.chapter_id === chapter.id)
          .map(lesson => ({ ...lesson, status: 'in-progress' as const })),
      })),
    };
  });


  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonWithStatus | null>(null);


  const handleLessonPress = (lesson: Lesson) => {
    setSelectedLesson({ ...lesson, status: 'in-progress' });
    bottomSheetRef.current?.present();
  };

  const handleOptionPress = (type: 'cours' | 'exercices') => {
    bottomSheetRef.current?.dismiss();
    if (!selectedLesson) return;

    if (type === 'cours') {
      navigation.navigate('ChatScreen', {
        lessonId: String(selectedLesson.id),
        lessonTitle: selectedLesson.title,
        context: `Explique-moi la leçon : ${selectedLesson.title}`,
      });
    } else {
      navigation.navigate('ExercicesScreen', {
        lessonId: String(selectedLesson.id)
      });
    }
  };

  const handleGoBack = () => navigation.goBack();

  return {
    user,
    matiere,
    selectedLesson,
    isLoading,
    coursesWithChapters,
    bottomSheetRef,
    handleLessonPress,
    handleOptionPress,
    handleGoBack,
  };
};