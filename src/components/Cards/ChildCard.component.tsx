import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ImageSourcePropType, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

interface ChildCardProps {
  firstName: string;
  classe: string;
  level: number;
  xp: number;
  maxXp: number;
  notifications?: number;
  avatar: ImageSourcePropType;
  onPress?: () => void;
  style?: ViewStyle;
}

const ChildCard: React.FC<ChildCardProps> = ({
  firstName,
  classe,
  level,
  xp,
  maxXp,
  notifications = 0,
  avatar,
  onPress,
  style,
}) => {
  // Calcul du pourcentage de progression
  const progressPercent = Math.min(100, Math.max(0, (xp / maxXp) * 100));

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {/* Header: Avatar + Infos + Flèche */}
      <View style={styles.header}>
        <Image source={avatar} style={styles.avatar} />
        
        <View style={styles.infoContainer}>
          <TypographyComponent variant="h4" color={colors.text.primary}>
            {firstName}
          </TypographyComponent>
          <TypographyComponent variant="bodySmall" color={colors.primary}>
            {classe} • Niveau {level}
          </TypographyComponent>
        </View>

        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={24} color={colors.text.tertiary} />
        </View>
      </View>

      {/* Section Progression */}
      <View style={styles.progressSection}>
        <View style={styles.xpRow}>
          <TypographyComponent variant="labelSmall" color={colors.text.secondary}>
            XP
          </TypographyComponent>
          <TypographyComponent variant="labelSmall" color={colors.text.secondary}>
            {xp} / {maxXp}
          </TypographyComponent>
        </View>
        
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${progressPercent}%` }
            ]} 
          />
        </View>
      </View>

      {/* Badge de Notification (Optionnel) */}
      {notifications > 0 && (
        <View style={styles.notificationContainer}>
          <View style={styles.notificationBadge}>
            <Ionicons name="warning-outline" size={16} color={colors.error} />
            <TypographyComponent 
              variant="labelSmall" 
              color={colors.error} 
              style={styles.notificationText}
            >
              {notifications} action{notifications > 1 ? 's' : ''} requise{notifications > 1 ? 's' : ''}
            </TypographyComponent>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    // Ombres
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'transparent', // Prêt pour un état sélectionné si besoin
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  progressSection: {
    width: '100%',
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.border.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  notificationContainer: {
    marginTop: 12,
    flexDirection: 'row',
  },
  notificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#FFF0F0', // Fond rouge très clair
    borderRadius: 8,
  },
  notificationText: {
    marginLeft: 6,
  },
});

export default ChildCard;