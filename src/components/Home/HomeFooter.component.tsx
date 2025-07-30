import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';
import Card from '@components/Card.component';

interface Course {
  id: number;
  subject: string;
  title: string;
  lastAccessed: string;
  progress: number;
  color: string;
}

interface HomeFooterProps {
  recentCourses: Course[];
  navigateToCourse: (courseId: number) => void;
  handleMenuPress: (courseId: number) => void;
  styles: any;
}

const HomeFooter: React.FC<HomeFooterProps> = ({ recentCourses, navigateToCourse, handleMenuPress, styles }) => {
  return (
    <View style={styles.courseSection}>
      <View style={styles.sectionHeader}>
        <TypographyComponent variant='h4' style={{}} color={colors.primary}>
          Mes cours
        </TypographyComponent>
      </View>
      <View style={styles.coursesContainer}>
        {recentCourses.map((course) => (
            <Card
            key={course.id}
            variant="course"
            category={course.subject}
            title={course.title}
            percentage={course.progress}
            description={`⏰ Dernier accès: ${course.lastAccessed}`}
            barColor={course.color}
            borderColor={course.color}
            onPress={() => navigateToCourse(course.id)}
            onMenuPress={() => handleMenuPress(course.id)}
            style={styles.modernCourseCard}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeFooter;
