import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

// Types simplifiés
export type CardVariant = 'mission' | 'achievement' | 'course' | 'custom';

interface CardProps {
  // Props essentielles
  variant?: CardVariant;
  title?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  // Éléments numériques/état
  points?: number;
  percentage?: number;
  isCompleted?: boolean;
  // Couleurs principales
  backgroundColor?: string;
  borderColor?: string;
  barColor?: string;
  // Menu
  showMenu?: boolean;
  onMenuPress?: () => void;
  // Styles et événements
  style?: ViewStyle;
  titleStyle?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

// Configuration par variante (simplifié)
const getVariantConfig = (variant: CardVariant) => {
  const configs = {
    mission: {
      layout: 'horizontal',
      showBar: true,
      showPoints: true,
      showBorder: false,
      showProgressBar: false,
      backgroundColor: 'white',
      borderColor: undefined,
      barColor: '#E0E0E0',
      pointsColor: '#FF8C00',
      showMenu: false,
    },
    achievement: {
      layout: 'vertical',
      showBar: false,
      showPoints: false,
      showBorder: true,
      showProgressBar: false,
      backgroundColor: 'white',
      borderColor: '#FFD700',
      barColor: '#FFD700',
      pointsColor: undefined,
      showMenu: false,
    },
    course: {
      layout: 'vertical',
      showBar: false,
      showPoints: false,
      showBorder: true,
      showProgressBar: true,
      backgroundColor: 'white',
      borderColor: '#FF8C00',
      barColor: '#FF8C00',
      pointsColor: undefined,
      showMenu: true,
    },
    custom: {
      layout: 'horizontal',
      showBar: false,
      showPoints: false,
      showBorder: false,
      showProgressBar: false,
      backgroundColor: 'white',
      borderColor: undefined,
      barColor: '#E0E0E0',
      pointsColor: undefined,
      showMenu: false,
    }
  };

  return configs[variant] || configs.custom;
};

const Card: React.FC<CardProps> = ({
  variant = 'custom',
  title,
  subtitle,
  description,
  category,
  points,
  percentage,
  isCompleted = false,
  backgroundColor,
  borderColor,
  barColor,
  showMenu,
  onMenuPress,
  style,
  titleStyle,
  onPress,
  disabled = false,
  children,
}) => {
  const config = getVariantConfig(variant);

  // Valeurs finales (props override config)
  const finalBgColor = backgroundColor || config.backgroundColor;
  const finalBorderColor = borderColor || config.borderColor;
  const finalBarColor = barColor || (isCompleted ? '#4CAF50' : config.barColor);
  const finalShowMenu = showMenu !== undefined ? showMenu : config.showMenu;
  const finalShowBorder = config.showBorder;
  const finalShowBar = config.showBar;
  const finalShowPoints = config.showPoints;
  const finalShowProgressBar = config.showProgressBar;
  const isVertical = config.layout === 'vertical';

  const cardStyle = [
    styles.card,
    {
      backgroundColor: finalBgColor,
      borderWidth: finalShowBorder ? 2 : 0,
      borderColor: finalBorderColor || 'transparent',
      flexDirection: (isVertical ? 'column' : 'row') as 'row' | 'column',
    },
    style,
  ];

  // Contenu personnalisé
  if (children) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  // Layout vertical (course, achievement)
  if (isVertical) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
        <View style={styles.verticalContent}>
          {/* Header avec catégorie et menu */}
          {(category || finalShowMenu) && (
            <View style={styles.header}>
              {category ? (
                <TypographyComponent
                  variant="label"
                  style={[styles.category, { color: finalBarColor }]}
                >
                  {category}
                </TypographyComponent>
              ) : <View />}
              {finalShowMenu && onMenuPress && (
                <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
                  <TypographyComponent style={styles.menuIcon}>•••</TypographyComponent>
                </TouchableOpacity>
              )}
            </View>
          )}
          {/* Titre principal avec style personnalisé */}
          {title && (
            <TypographyComponent
              variant="h6"
              style={[
                styles.title, 
                { marginTop: category ? 8 : 0 },
                titleStyle // 👈 APPLICATION DU STYLE PERSONNALISÉ
              ]}
            >
              {title}
            </TypographyComponent>
          )}
          {/* Sous-titre */}
          {subtitle && (
            <TypographyComponent variant="body" style={styles.subtitle}>
              {subtitle}
            </TypographyComponent>
          )}
          {/* Description */}
          {description && (
            <TypographyComponent
              variant="body"
              style={[styles.description, { marginTop: title ? 8 : 0 }]}
            >
              {description}
            </TypographyComponent>
          )}
          {/* Barre de progression */}
          {finalShowProgressBar && percentage !== undefined && (
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <TypographyComponent variant="bodySmall" style={styles.progressLabel}>
                  Progression
                </TypographyComponent>
                <TypographyComponent variant="bodySmall" style={styles.progressValue}>
                  {percentage}%
                </TypographyComponent>
              </View>
              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: finalBarColor,
                    }
                  ]}
                />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  // Layout horizontal (mission, custom)
  return (
    <TouchableOpacity style={cardStyle} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      {/* Barre de statut */}
      {finalShowBar && (
        <View style={[styles.statusBar, { backgroundColor: finalBarColor }]} />
      )}
      {/* Contenu principal */}
      <View style={styles.horizontalContent}>
        <View style={styles.textSection}>
          {title && (
            <TypographyComponent
              variant="h6"
              style={[
                styles.title,
                titleStyle
              ]}
            >
              {title}
            </TypographyComponent>
          )}
          {description && (
            <TypographyComponent variant="body" style={styles.description}>
              {isCompleted ? 'Mission accomplie avec brio !' : description}
            </TypographyComponent>
          )}
          {category && (
            <TypographyComponent
              variant="label"
              style={[styles.category, { color: finalBarColor }]}
            >
              {category}
            </TypographyComponent>
          )}
        </View>
        {/* Section droite */}
        <View style={styles.rightSection}>
          {/* Badge points */}
          {finalShowPoints && points !== undefined && (
            <View style={[styles.pointsBadge, { backgroundColor: config.pointsColor }]}>
              <TypographyComponent style={styles.pointsText}>
                +{points} pts
              </TypographyComponent>
            </View>
          )}
          {/* Checkmark */}
          {isCompleted && (
            <View style={[styles.checkmark, { backgroundColor: finalBarColor }]}>
              <TypographyComponent style={styles.checkmarkText}>✓</TypographyComponent>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Layout vertical
  verticalContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressSection: {
    marginTop: 'auto',
    paddingTop: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    color: '#666',
    fontWeight: '500',
  },
  progressValue: {
    color: '#666',
    fontWeight: '600',
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Layout horizontal
  horizontalContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBar: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 16,
  },
  textSection: {
    flex: 1,
    marginRight: 16,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  pointsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  pointsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Textes communs
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text?.title || '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text?.secondary || '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.text?.secondary || '#666',
    marginBottom: 6,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Menu
  menuButton: {
    padding: 4,
    borderRadius: 4,
  },
  menuIcon: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default Card;