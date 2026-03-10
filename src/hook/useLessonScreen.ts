import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useUserStore } from '@store/user/user.store';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { useSubjects } from '@queries/course.queries';

type LessonScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const useLessonScreen = () => {
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const user = useUserStore(state => state.user);

  const [currentClass, setCurrentClass] = useState(user?.classe);
  const { data: subjects = [], isLoading } = useSubjects();

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