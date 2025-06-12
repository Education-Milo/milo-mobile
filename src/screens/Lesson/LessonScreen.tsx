import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';
import { RootStackParamList } from '@navigation/types';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LessonScreenProps {
  navigation: NavigationProp;
}

function LessonScreen({ navigation }: LessonScreenProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <Layout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Planning des cours</Text>

        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#3b82f6',
            },
            '2025-06-12': {
              marked: true,
              dotColor: 'red',
              activeOpacity: 0,
            },
            '2025-06-13': {
              marked: true,
              dotColor: 'green',
              activeOpacity: 0,
            },
          }}
          theme={{
            todayTextColor: '#3b82f6',
            selectedDayBackgroundColor: '#3b82f6',
            arrowColor: '#3b82f6',
          }}
        />

        {selectedDate !== '' && (
          <Text style={styles.subtitle}>
            Cours sélectionné pour : {selectedDate}
          </Text>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default LessonScreen;
