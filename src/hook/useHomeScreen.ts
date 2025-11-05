import { useEffect, useMemo, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { fakeRecentCourses, fakeDailyMissions } from '@api/fake-data-api';

interface Mission {
  id: number;
  title: string;
  description: string;
  category: string;
  points: number;
  isCompleted: boolean;
}

interface Course {
  id: number;
  subject: string;
  title: string;
  lastAccessed: string;
  progress: number;
  color: string;
}

export interface UseHomeScreenOptions {
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

export interface UseHomeScreenReturn {
  recentCourses: Course[];
  dailyMissions: Mission[];
  completedMissions: number;
  totalMissions: number;
  error: string | null;
  showMenu: boolean;
  handleMenuPress: (courseId: number) => void;
  handleMenuClose: () => void;
  handleDeleteCourse: () => void;
  handleAccessCourse: () => void;
  navigateToCourse: (courseId: number) => void;
}

export function useHomeScreen(options: UseHomeScreenOptions = {}): UseHomeScreenReturn {
  const { navigation } = options;

  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [dailyMissions, setDailyMissions] = useState<Mission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // À remplacer par de vrais appels API
    fetch('/api/courses')
      .then(res => res.json())
      .then((data: Course[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setRecentCourses(data);
        } else {
          setError('Aucun cours trouvé.');
          setRecentCourses([]);
        }
      })
      .catch(() => {
        setRecentCourses(fakeRecentCourses);
      });

    fetch('/api/missions')
      .then(res => res.json())
      .then((data: Mission[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setDailyMissions(data);
        } else {
          setError('Aucune mission trouvée.');
          setDailyMissions([]);
        }
      })
      .catch(() => {
        setDailyMissions(fakeDailyMissions);
      });
  }, []);

  const completedMissions = useMemo(() => (
    dailyMissions.filter(mission => mission.isCompleted).length
  ), [dailyMissions]);

  const totalMissions = useMemo(() => dailyMissions.length, [dailyMissions]);

  const navigateToCourse = (courseId: number) => {
    const course = recentCourses.find(c => c.id === courseId);
    if (!navigation) return;
    if (course) {
      navigation.navigate('LessonChapter', { matiere: course.subject });
    } else {
      navigation.navigate('Lesson');
    }
  };

  const handleMenuPress = (courseId: number) => {
    setSelectedCourseId(courseId);
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
    setSelectedCourseId(null);
  };

  const handleDeleteCourse = () => {
    handleMenuClose();
  };

  const handleAccessCourse = () => {
    if (selectedCourseId && navigation) {
      const course = recentCourses.find(c => c.id === selectedCourseId);
      if (course) {
        navigation.navigate('LessonChapter', { matiere: course.subject });
      } else {
        navigation.navigate('Lesson');
      }
    }
    handleMenuClose();
  };

  return {
    recentCourses,
    dailyMissions,
    completedMissions,
    totalMissions,
    error,
    showMenu,
    handleMenuPress,
    handleMenuClose,
    handleDeleteCourse,
    handleAccessCourse,
    navigateToCourse,
  };
}

export default useHomeScreen;


