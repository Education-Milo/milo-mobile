import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import TypographyComponent from '@components/Typography.component';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: string;
  borderColor: string;
  iconBackground: string;
  onPress: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  description,
  icon,
  borderColor,
  iconBackground,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: borderColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
        <TypographyComponent style={styles.icon}>
          {icon}
        </TypographyComponent>
      </View>
      <TypographyComponent variant="h6" style={styles.title}>
        {title}
      </TypographyComponent>

      <TypographyComponent variant="bodySmall" style={styles.description}>
        {description}
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
    // Ombre pour iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Ombre pour Android
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