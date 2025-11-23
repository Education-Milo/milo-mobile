import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, CheckCircle, Lock, PlayCircle } from 'lucide-react-native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';
import { Chapter, Lesson } from '@store/course/course.model';

interface ChapterAccordionProps {
  chapter: Chapter;
  chapterNumber: number;
  defaultOpen?: boolean;
  onLessonPress: (lesson: Lesson) => void;
}

const ChapterAccordion = ({
  chapter,
  chapterNumber,
  defaultOpen = false,
  onLessonPress
}: ChapterAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getLessonIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={18} color="#4CAF50" />;
      case 'in-progress': return <PlayCircle size={18} color="#FF9800" />;
      default: return <Lock size={18} color="#9E9E9E" />;
    }
  };

  return (
    <View style={styles.chapterAccordion}>
      <TouchableOpacity style={styles.chapterHeader} onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.chapterHeaderLeft}>
          <View style={styles.chapterHeaderTitle}>
            <TypographyComponent variant='labelSmall' color={colors.text.secondary}>
              Notion {chapterNumber}
            </TypographyComponent>
            <TypographyComponent variant="h6" style={{ marginTop: 4 }}>
              {chapter.title}
            </TypographyComponent>
          </View>
        </View>
        <ChevronDown size={24} color={colors.text.secondary} style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }} />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.chapterContent}>
          {chapter.lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lessonItem, styles[`lesson_${lesson.status}` as keyof typeof styles]]}
              onPress={() => lesson.status !== 'locked' && onLessonPress(lesson)}
              disabled={lesson.status === 'locked'}
            >
              <View style={styles.lessonIcon}>{getLessonIcon(lesson.status)}</View>
              <TypographyComponent variant="body" style={{ flex: 1 }}>
                {lesson.title}
              </TypographyComponent>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chapterAccordion: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    overflow: 'hidden'
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  chapterHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  chapterHeaderTitle: {
    flex: 1
  },
  chapterContent: {
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5'
  },
  lesson_completed: { backgroundColor: '#E8F5E9' },
  lesson_in_progress: { backgroundColor: '#FFF3E0' },
  lesson_locked: { backgroundColor: '#F5F5F5', opacity: 0.6 },
  lessonIcon: { marginRight: 12 },
});

export default ChapterAccordion;