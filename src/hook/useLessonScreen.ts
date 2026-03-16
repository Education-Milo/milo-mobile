import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useUserStore } from '@store/user/user.store';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { useSubjects } from '@queries/course.queries';
import { CLASS_OPTIONS } from '@constants/constants';

type LessonScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const useLessonScreen = () => {
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const user = useUserStore(state => state.user);
  const availableClasses = CLASS_OPTIONS.filter(option => {
    const userClassIndex = CLASS_OPTIONS.findIndex(o => o.value === user?.classe);
    const optionIndex = CLASS_OPTIONS.findIndex(o => o.value === option.value);
    return optionIndex >= userClassIndex;
  });

  const [currentClass, setCurrentClass] = useState(user?.classe);
  const { data: subjects = [], isLoading } = useSubjects();

  const handleSubjectPress = (subjectId: number, title: string) => {
    navigation.navigate('LessonChapter', { matiere: title });
  };

  return {
    user,
    availableClasses,
    subjects,
    isLoading,
    currentClass,
    setCurrentClass,
    handleSubjectPress,
  };
};