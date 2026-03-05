import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import TypographyComponent from '@components/Typography.component';

export interface CourseVisuals {
  title: string;
  emoji: string;
  colorTheme: 'orange' | 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'teal' | 'pink';
}

export const SUBJECTS_CONFIG: Record<string | number, CourseVisuals> = {
  1: {
    title: 'Mathématiques',
    emoji: '🧮',
    colorTheme: 'blue',
  },
  2: {
    title: 'Français',
    emoji: '🇫🇷',
    colorTheme: 'red',
  },
  '3': {
    title: 'Histoire-Géographie',
    emoji: '🏛️',
    colorTheme: 'yellow',
  },
  '6': {
    title: 'Anglais',
    emoji: '🇬🇧',
    colorTheme: 'purple',
  },
  '5': {
    title: 'Physique-Chimie',
    emoji: '🧪',
    colorTheme: 'orange',
  },
  '4': {
    title: 'SVT',
    emoji: '🌱',
    colorTheme: 'teal',
  },
};

const COLOR_THEMES: Record<CourseVisuals['colorTheme'], { borderColor: string; iconBackground: string }> = {
  blue: { borderColor: '#3B82F6', iconBackground: '#DBEAFE' },
  red: { borderColor: '#EF4444', iconBackground: '#FEE2E2' },
  green: { borderColor: '#22C55E', iconBackground: '#DCFCE7' },
  orange: { borderColor: '#F97316', iconBackground: '#FFEDD5' },
  purple: { borderColor: '#8B5CF6', iconBackground: '#EDE9FE' },
  yellow: { borderColor: '#EAB308', iconBackground: '#FEF9C3' },
  teal: { borderColor: '#14B8A6', iconBackground: '#CCFBF1' },
  pink: { borderColor: '#EC4899', iconBackground: '#FCE7F3' },
};

interface SubjectCardProps {
  id: number | string;
  title: string;
  icon?: string;
  borderColor?: string;
  iconBackground?: string;
  onPress: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  id,
  title,
  icon,
  borderColor,
  iconBackground,
  onPress,
}) => {
  const config = SUBJECTS_CONFIG[id];
  const effectiveEmoji = icon ?? config?.emoji ?? '📚';
  const theme = config ? COLOR_THEMES[config.colorTheme] : undefined;
  const effectiveBorderColor = theme?.borderColor ?? borderColor ?? '#E5E7EB';
  const effectiveIconBackground = theme?.iconBackground ?? iconBackground ?? '#F3F4F6';

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: effectiveBorderColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: effectiveIconBackground }]}>
        <TypographyComponent style={styles.icon}>
          {effectiveEmoji}
        </TypographyComponent>
      </View>
      <TypographyComponent variant="h6" style={styles.title}>
        {title}
      </TypographyComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 160,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
});

export default SubjectCard;