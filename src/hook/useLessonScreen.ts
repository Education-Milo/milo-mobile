import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useUserStore } from '@store/user/user.store';
import { useCourseStore } from '@store/course/course.store';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';

type LessonScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const useLessonScreen = () => {
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const user = useUserStore(state => state.user);

  const { subjects, get_subjects, isLoading } = useCourseStore();
  const [currentClass, setCurrentClass] = useState(user?.classe);

  useEffect(() => {
    get_subjects();
  }, [get_subjects]);

  const handleSubjectPress = (subjectId: number, title: string) => {
    navigation.navigate('LessonChapter', { matiere: title });
  };

  return {
    user,
    subjects,
    isLoading,
    currentClass,
    setCurrentClass,
    handleSubjectPress,
  };
};