import React from 'react';
import { Image, Text, TouchableOpacity, View, ViewStyle, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypographyComponent from './Typography.component';
import { colors } from '@themes/colors';

interface HeaderProps {
  notificationCount?: number;
  userPoints?: number;
  streakDays?: number;
  showNotifications?: boolean;
  showPoints?: boolean;
  showStreak?: boolean;
  showSettings?: boolean;
  backgroundColor?: string;
}

function Header({
  notificationCount = 0,
  userPoints = 0,
  streakDays = 0,
  showNotifications = true,
  showPoints = true,
  showStreak = true,
  showSettings = true,
  backgroundColor = 'transparent',
}: HeaderProps) {

  return (
    <View style={[viewStyles.header, { backgroundColor }]}>
      <Image
        source={require('@assets/images/logo_sans_fond.png')}
        style={localStyles.smallLogo}
      />
      {/* Partie droite avec notifications, points et streak */}
      <View style={viewStyles.headerRight}>
        {showPoints && (
          <View style={viewStyles.pointsButton}>
            <TypographyComponent
              variant='bodySmall'
              style={{ fontSize: 14 }}
              color={colors.white}
            >
              🔸 {userPoints}
            </TypographyComponent>
          </View>
        )}
        {showStreak && (
          <View style={viewStyles.streakContainer}>
            <TypographyComponent
              variant='bodySmall'
              style={{ fontSize: 14 }}
              color={colors.white}
            >
              🔥 {streakDays}
            </TypographyComponent>
          </View>
        )}
        {showNotifications && (
          <TouchableOpacity
            style={viewStyles.notificationContainer}
            onPress={() => {
              console.log('Notification pressée');
            }}
          >
            <View style={viewStyles.notificationBadge}>
              <Ionicons name="notifications-outline" size={18} color="#666" />
            </View>
            {notificationCount > 0 && (
              <View style={viewStyles.redDot}/>
            )}
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity
            onPress={() => {
              console.log('Paramètres pressés');
            }}
          >
            <Ionicons name="options-outline" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const localStyles = {
  smallLogo: {
    width: 70,
    height: 35,
  } as ImageStyle,
} as const;

const viewStyles: { [key: string]: ViewStyle } = {
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 20,
  },
  headerRight: {
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 12,
  },
  pointsButton: {
    backgroundColor: '#FFD100', // #0055FF Bleu ROI | #004E7C Bleu pétrole | #FFD100 Jaune doré | #FFE680 Jaune pastel | #FFCF40 jaune sable
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row' as const,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center',
    backgroundColor: '#ff9500',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContainer: {
    position: 'relative' as const,
  },
  notificationBadge: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  redDot: {
    position: 'absolute' as const,
    top: 2,
    right: 2,
    backgroundColor: '#ff3b30',
    borderRadius: 6,
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
};

export default Header;