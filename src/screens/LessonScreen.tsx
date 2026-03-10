import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';

import Layout from '@components/Layout';
import TypographyComponent from '@components/Typography.component';
import SubjectCard from '@components/SubjectCard.component';
import { colors } from '@theme/colors';
import LessonCard from '@components/Cards/LessonCard.component';
import { useLessonScreen } from '@hooks/useLessonScreen';
import LoadingScreen from '@screens/LoadingScreen';

const LessonScreen = () => {
  const {
    user,
    subjects,
    isLoading,
    currentClass,
    setCurrentClass,
    handleSubjectPress,
  } = useLessonScreen();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <Animated.ScrollView
        style={styles.container}
        entering={FadeInDown.duration(600).springify()}
        showsVerticalScrollIndicator={false}
      >
        <LessonCard
          userName={user?.first_name}
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
                id={matiere.id}
                title={matiere.title}
                onPress={() => handleSubjectPress(matiere.id, matiere.title)}
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