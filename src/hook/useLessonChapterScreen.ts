import { useEffect, useRef, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { useUserStore } from '@store/user/user.store';
import { useCourseStore } from '@store/course/course.store';
import { Chapter, Course, Lesson, Subject } from '@store/course/course.model';

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

  const {
    subjects,
    get_subjects,
    get_courses,
    get_chapters,
    get_lessons,
    isLoading,
  } = useCourseStore();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedLesson, setSelectedLesson] = useState<LessonWithStatus | null>(null);
  const [coursesWithChapters, setCoursesWithChapters] = useState<CourseWithChapters[]>([]);

  useEffect(() => {
    const loadCourseData = async () => {
      setIsLoadingData(true);
      if (!matiere) return;

      try {
        const availableSubjects: Subject[] = subjects.length
          ? subjects
          : await get_subjects();

        const subject = availableSubjects.find((s) => s.title === matiere);
        if (!subject) return;

        const courses = await get_courses(subject.id);
        if (!courses.length) return;
        const coursesWithTheirChapters = await Promise.all(
          courses.map(async (course) => {
            const fetchedChapters = await get_chapters(course.id);
            const allLessonsPerChapter = await Promise.all(
              fetchedChapters.map((chapter) => get_lessons(chapter.id))
            );
            return {
              ...course,
              chapters: fetchedChapters.map((chapter, index) => ({
                ...chapter,
                lessons: allLessonsPerChapter[index].map((lesson) => ({
                  ...lesson,
                  status: 'in-progress' as const,
                })),
              })),
            };
          })
        );
        setCoursesWithChapters(coursesWithTheirChapters);
      } catch (error) {
        console.error('[useLessonChapterScreen] Failed to load course data:', error);
      } finally {
        setIsLoadingData(false)
      }
    };

    loadCourseData();
  }, [matiere]);

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
    isLoading,
    coursesWithChapters,
    selectedLesson,
    bottomSheetRef,
    handleLessonPress,
    handleOptionPress,
    handleGoBack,
  };
};