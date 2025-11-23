import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';

import Layout from '@components/Layout';
import TypographyComponent from '@components/Typography.component';
import SubjectCard from '@components/SubjectCard.component';
import { colors } from '@theme/colors';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';

import { useUserStore } from '@store/user/user.store';
import { useCourseStore } from '@store/course/course.store';
import LessonCard from '@components/Cards/LessonCard.component';

type LessonScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const LessonScreen = () => {
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const user = useUserStore(state => state.user);

  const { subjects, fetchSubjects, isLoading } = useCourseStore();
  const [currentClass, setCurrentClass] = useState('6eme'); // Classe remplacer par user.classe si dispo

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <Layout>
      <Animated.ScrollView
        style={styles.container}
        entering={FadeInDown.duration(600).springify()}
        showsVerticalScrollIndicator={false}
      >
        <LessonCard
          userName={user?.prenom}
        />
        <View style={styles.header}>
          <TypographyComponent variant="h4">
             Mes Cours 📚
          </TypographyComponent>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currentClass}
              style={{ height: 50, width: 120 }}
              onValueChange={(itemValue) => setCurrentClass(itemValue)}
            >
              <Picker.Item label="6ème" value="6eme" />
              <Picker.Item label="5ème" value="5eme" />
              <Picker.Item label="4ème" value="4eme" />
              <Picker.Item label="3ème" value="3eme" />
            </Picker>
          </View>
        </View>

        {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
        ) : (
            <View style={styles.subjectsContainer}>
            {subjects.map((matiere) => (
                <SubjectCard
                key={matiere.id}
                title={matiere.name}
                description={matiere.description}
                icon={matiere.icon}
                borderColor={matiere.borderColor}
                iconBackground={matiere.iconBackground}
                onPress={() => navigation.navigate('LessonChapter', { matiere: matiere.name })}
                />
            ))}
            </View>
        )}
      </Animated.ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
  },
  subjectsContainer: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 24,
  },
});

export default LessonScreen;